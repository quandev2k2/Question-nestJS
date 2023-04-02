import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Brackets, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile, selectedKeysProfile, selectedKeysUser } from "../../entities";
import { MysqlError } from "mysql";
import { SUCCESS_CODES } from "../../constants/successCodes";
import { ERROR_CODES, ROLE_NAME } from "../../constants";
import { removeFile } from "../../common/validatorContraints/imageStorage";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
      ) {  }
      public async create(createProfileDto: any) {
        return await this.profileRepository.save(createProfileDto);
    }

    private checkMysqlError(error: any)
    {
      const mysqlError = error as MysqlError;
      if (mysqlError.code === 'ER_DUP_ENTRY') throw new BadRequestException(mysqlError.sqlMessage);
      else throw new InternalServerErrorException(mysqlError.message);
    }
}
