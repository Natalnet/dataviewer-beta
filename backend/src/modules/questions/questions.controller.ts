import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QuestionsService } from './questions.service';
import { CreateDifficultyQuestionDto } from './dto/create-difficulty-question';
import { UpdateDifficultyQuestionDto } from './dto/update-difficulty-question';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('difficulty/:id')
  findDifficultyQuestionById(@Param('id') id: string) {
    return this.questionsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('difficulty')
  createDifficultyForQuestion(@Body() request: CreateDifficultyQuestionDto) {
    return this.questionsService.create(request);
  }

  @UseGuards(JwtAuthGuard)
  @Put('difficulty/:id')
  updateDifficultyForQuestion(
    @Param('id') id: string,
    @Body() request: UpdateDifficultyQuestionDto,
  ) {
    return this.questionsService.updateById(id, request);
  }
}
