import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_CODES, ROLE_NAME } from 'src/constants';
import {
  selectedKeysUser,
  Profile,
  User,
  selectedKeysProfile
} from '../../entities';
import { Brackets, IsNull, Repository } from 'typeorm';
import { MysqlError } from 'mysql';
import { CreateNewUser } from './users.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUsers } from './update-users.dto';
import { AuthService } from '../auth/auth.service';
import config from '../../config';
import { SUCCESS_CODES } from '../../constants/successCodes';
import { ProfileService } from '../profile/profile.service';
import { checkMysqlError } from 'src/common/validatorContraints/checkMysqlError';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private profileService: ProfileService,
    private authService: AuthService,
  ) {}

  public getListUser(pagination: any, authId: number) {
    try {
      const { offset = 0, limit = 10, keyword } = pagination;
      const query = this.usersRepository
        .createQueryBuilder('users')
        // .where('users.id != :id', {id: authId})
        .orderBy('users.id', 'DESC')
        .leftJoinAndSelect('users.profile', 'profiles')
        .select([
          ...selectedKeysUser.map((x) => `users.${x}`),
          ...selectedKeysProfile.map((x) => `profiles.${x}`),
        ])
        .skip(offset)
        .take(limit);

      if (keyword) {
        query.andWhere(
          new Brackets((qr) => {
            qr.where('users.email LIKE :keyword', { keyword: `%${keyword}%` })
              .orWhere('profiles.first_name LIKE :keyword', {
                keyword: `%${keyword}%`,
              })
              .orWhere('profiles.last_name LIKE :keyword', {
                keyword: `%${keyword}%`,
              });
          }),
        );
      }

      return query.getManyAndCount();
    } catch (error) {
      this.checkMysqlError(error);
    }
  }


  public async delete(id: number, authId: number) {
    const users = await this.usersRepository.findOne({
      where: { id, deleted_at: IsNull() },
      relations: ['profile'],
    });
    if (id === authId) {
      throw new UnauthorizedException(ERROR_CODES.UNAUTHORIZED);
    }
    if (!users) {
      throw new NotFoundException(ERROR_CODES.USER_NOT_FOUND);
    }

    try {
      await this.usersRepository.softDelete(id);
      return { message: ERROR_CODES.DELETE_SUCCESSFULLY, id: users.id };
    } catch (error) {
      this.checkMysqlError(error);
    }
  }

  private checkMysqlError(error: any) {
    const mysqlError = error as MysqlError;
    if (mysqlError.code === 'ER_DUP_ENTRY')
      throw new BadRequestException(mysqlError.sqlMessage);
    else throw new InternalServerErrorException(mysqlError.message);
  }

  public async updatePassword(
    id: number,
    requestPassword: string,
    authUser: { userId: string; email: string; kind: string },
  ) {
    try {
      if (
        authUser.kind === ROLE_NAME.ADMIN ||
        parseInt(authUser.userId) === id
      ) {
        const password: string = await bcrypt.hash(
          requestPassword,
          config.BCRYPT_SALT_ROUND,
        );
        await this.usersRepository.update(id, { password: password });
        return { message: SUCCESS_CODES.UPDATE_SUCCESSFULLY, id: id };
      }
      return { message: ERROR_CODES.UNAUTHORIZED };
    } catch (error) {
      this.checkMysqlError(error);
    }
  }

  public async create(body: CreateNewUser) {
    try {
      const hashPassword: string = await bcrypt.hash(body.password, 12);
      body = { ...body, password: hashPassword };
      const userInfo: { email; password; active; role } = body;
      const userCreate: User = await this.usersRepository.save({
        ...userInfo,
        active: true,
      });
      const profileInfo = { ...body, user: userCreate.id };
      const {
        first_name,
        last_name,
        phone,
        birth_of_date,
        address,
        gender,
        user,
        permission,
        position,
        period,
        major,
        description,
      } = profileInfo;

      const profile: Profile = await this.profileService.create({
        first_name,
        last_name,
        phone,
        birth_of_date,
        address,
        gender,
        user,
        permission,
        position,
        period,
        major,
        description,
      });


      // Create refresh token
      await this.usersRepository.update(+userCreate.id, {
        refresh_token: this.authService.createRefreshToken(userCreate),
        profile
      });
      return { message: ERROR_CODES.CREATE_SUCCESSFULLY, data: userCreate };
    } catch (error) {
      this.checkMysqlError(error);
    }
  }

  public async getDetail(id: number) {
    try {
      const data = await this.usersRepository.findOne({
        relations: {
          profile: true,
        },
        where : [{id}],
      })
      let gender = '';

      if(data?.profile?.gender == 1) {
        gender = 'male';
      } else if(data?.profile?.gender == 2) {
        gender = 'famle'
      } else {
        gender = 'another'
      }

      if (!data) {
        throw new  NotFoundException(ERROR_CODES.USER_NOT_FIND);
      } else {
        return [{
          'id' : data?.id,
          'email': data?.email,
          'role': (data?.role == 1) ? 'admin' : 'user',
          'profile': [
            {
              'first_name' : data?.profile?.first_name,
              'last_name' : data?.profile?.last_name,
              'avatar': 'https://photo-cms-kienthuc.epicdn.me/zoom/800/uploaded/hoangthao/2022_03_18/bieu-cam-dang-yeu-cua-nhung-con-meo-cung-khien-ban-tan-chay.jpg',
              'gender' : gender,
              'phone': data?.profile?.phone,
              'birth_of_date': data?.profile?.birth_of_date,
              'permission': data?.profile?.permission,
              'position': data?.profile?.position,
              'period': data?.profile?.period,
              'major': data?.profile?.major,
              'address': data?.profile?.address,
              'description': data?.profile?.description
            }
          ],
        }];
      }
    } catch (e) {
      checkMysqlError(e)
    }
  }

  public async update(
    id: number,
    body: UpdateUsers,
    authUser: { userId: string; email: string; kind: string },
  ) {
    try {
      if (
        authUser.kind === ROLE_NAME.ADMIN ||
        parseInt(authUser.userId) === id
      ) {
        const user: any = await this.usersRepository.findOne({
          where: { id },
        });
        let { email, active, role, password, confirm_password, ...restBody } =
          body;
        let userUpdate = { email, active, role, password };
        if (password) {
          const passwordHash: string = !!body.password.length
            ? await bcrypt.hash(password, +config.BCRYPT_SALT_ROUND)
            : user.password;
          userUpdate = { ...userUpdate, password: passwordHash };
        }
        await this.usersRepository.update(id, userUpdate);
        const profileId = user?.profile?.id;
        return { message: SUCCESS_CODES.UPDATE_SUCCESSFULLY, data: userUpdate };
      }
      return { message: ERROR_CODES.UNAUTHORIZED };
    } catch (error) {
      this.checkMysqlError(error);
    }
  }
}
