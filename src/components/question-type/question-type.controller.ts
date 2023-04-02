import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuestionTypeService } from './question-type.service';

@ApiTags('question-type')
@Controller('api/question-type')
export class QuestionTypeController {
    constructor(
        private readonly questionTypeService: QuestionTypeService
    ) {};

    @Post()
    async create() {
        return 1;
    }
}
