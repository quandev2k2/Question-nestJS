import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './ormconfig';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminModule } from './components/admin/admin.module';
import { UsersModule } from './components/users/users.module';
import { AuthModule } from './components/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { ProfileService } from './components/profile/profile.service';
import { ProfileModule } from './components/profile/profile.module';
import { MailerModule } from '@nest-modules/mailer';
import config from './config';
import { HandlebarsAdapter } from '@nest-modules/mailer';
@Module({
  imports: [
    AdminModule,
    AuthModule,
    TypeOrmModule.forRoot(ormconfig),
    ScheduleModule.forRoot(),
    UsersModule,
    ProfileModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MulterModule.register({
      dest: './files/upload',
    }),
  ],
})
export class AppModule {}
