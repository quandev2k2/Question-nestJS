import {
  Entity,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  AfterUpdate
} from "typeorm";
import {
  ColumnString,
  ColumnText,
  ColumnBoolean,
  ColumnPhone, ColumnDate,
  ColumnTinyInt
} from "./columns";
import { User } from "./user.entity";

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number

  @ColumnString()
  first_name: string

  @ColumnString()
  last_name: string

  @ColumnText()
  avatar: string

  @ColumnTinyInt()
  gender: number

  @ColumnPhone()
  phone: string

  @ColumnDate()
  birth_of_date: Date;

  @ColumnTinyInt(true)
  permission: number;

  @ColumnTinyInt(true)
  position: number;

  @ColumnTinyInt(true)
  period: number; // Khóa ( k15 ...)

  @ColumnText()
  major: string

  @ColumnString()
  address: string

  @ColumnText()
  description: string

  @OneToOne(() => User)
  @JoinColumn()
  user: User
}

export const selectedKeysProfile: Array<keyof Profile> = [
    'id',
    'user',
    'first_name',
    'last_name',
    'avatar',
    'gender',
    'phone',
    'birth_of_date',
    'permission',
    'position',
    'period',
    'major',
    'address',
    'description',
];
