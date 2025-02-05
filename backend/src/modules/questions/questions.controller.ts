import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QuestionsService } from './questions.service';
import { DifficultyOfQuestionDto } from './dto/post-difficulty-of-question';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  
  @Get('difficulty/:id')
  findDifficultyQuestionById(@Param('id') id: string) {
    return this.questionsService.findDifficultyQuestionById(id);
  }

  
  @Post('difficulty')
  createDifficultyForQuestion(@Body() request: DifficultyOfQuestionDto) {
    return this.questionsService.createDifficultyOfQuestion(request);
  }

  @UseGuards(JwtAuthGuard)
  @Put('difficulty/:id')
  updateDifficultyForQuestion(@Param('id') id: string, @Body() request: DifficultyOfQuestionDto) {
    return this.questionsService.updateDifficultyOfQuestion(id, request);
  }
  
}
