import { ApiProperty } from '@nestjs/swagger';

export class DifficultyOfQuestionDto {
  @ApiProperty({ description: 'Id Questions'})
  question_id: string;
  @ApiProperty({ description: 'Porcentagem de Dificuldade'})
  percentage: number;
}