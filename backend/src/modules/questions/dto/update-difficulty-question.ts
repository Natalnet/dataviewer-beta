import { PartialType } from '@nestjs/mapped-types';
import { CreateDifficultyQuestionDto } from './create-difficulty-question';

export class UpdateDifficultyQuestionDto extends PartialType(CreateDifficultyQuestionDto) {}
