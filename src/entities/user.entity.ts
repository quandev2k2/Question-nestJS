import {
  Entity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  Column,
} from 'typeorm';
import {
  ColumnPasswordHash,
  ColumnUsername,
  ColumnEmail,
  ColumnTinyInt,
  ColumnPrimaryKeyInt,
  ColumnBoolean,
  ColumnLongString,
  ColumnString,
  ColumnText
} from './columns';
import { Exclude } from 'class-transformer';
import { Profile } from './profile.entity';

@Entity('users')
export class User {
  @ColumnPrimaryKeyInt()
  id: number;

  @ColumnEmail(true)
  @Index('email', { unique: true })
  email: string;

  @ColumnPasswordHash()
  @Exclude()
  password: string;

  @ColumnTinyInt(true)
  role: number;

  @ColumnBoolean()
  active: boolean;

  @ColumnLongString()
  refresh_token: string;

  // Time
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @ColumnText()
  location: string
}

export const selectedKeysUser: Array<keyof User> = ['id', 'email', 'role'];
