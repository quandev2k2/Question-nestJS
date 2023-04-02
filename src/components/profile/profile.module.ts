import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "../../entities/profile.entity";
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PaginationMiddleware } from 'src/common/middlewares';

@Module({
    imports: [TypeOrmModule.forFeature([Profile])],
    controllers: [ProfileController],
    providers: [ProfileService]
})
export class ProfileModule {
    configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware())
      .forRoutes(
        { path: 'profiles', method: RequestMethod.GET },
      );
  }
}
