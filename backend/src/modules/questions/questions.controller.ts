import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QuestionsService } from './questions.service';
import { DifficultyOfQuestionDto } from './dto/post-difficulty-of-question';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get('difficulty/:id')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get the difficulty of a question by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Question found successfully.',
    schema: {
      type: 'object',
      properties: {
        question_id: { type: 'string' },
        percentage: { type: 'number' },
      },
    },
  }) // Resposta esperada
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized - Authentication credentials are missing or invalid.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Question with id not found.',
  })
  findDifficultyQuestionById(@Param('id') id: string) {
    return this.questionsService.findDifficultyQuestionById(id);
  }

  @Post('difficulty')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create a new difficulty of a question',
  })
  @ApiResponse({
    status: 201,
    description: 'Question created successfully.',
    schema: {
      type: 'object',
      properties: {
        question_id: { type: 'string' },
        percentage: { type: 'number' },
      },
    },
  }) // Resposta esperada
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized - Authentication credentials are missing or invalid.',
  })
  createDifficultyForQuestion(@Body() request: DifficultyOfQuestionDto) {
    return this.questionsService.createDifficultyOfQuestion(request);
  }

  @Put('difficulty/:id')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update difficulty of a question',
  })
  @ApiResponse({
    status: 200,
    description: 'Updated question successfully.',
    schema: {
      type: 'object',
      properties: {
        question_id: { type: 'string' },
        percentage: { type: 'number' },
      },
    },
  }) // Resposta esperada
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized - Authentication credentials are missing or invalid.',
  })
  updateDifficultyForQuestion(@Param('id') id: string, @Body() request: DifficultyOfQuestionDto) {
    return this.questionsService.updateDifficultyOfQuestion(id, request);
  }
}
