import { Module } from '@nestjs/common';
import { QuestionTypeController } from './question-type.controller';
import { QuestionTypeService } from './question-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionType } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionType])],
  controllers: [QuestionTypeController],
  providers: [QuestionTypeService]
})
export class QuestionTypeModule {}
