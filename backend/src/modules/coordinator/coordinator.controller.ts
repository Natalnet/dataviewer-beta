import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CoordinatorService } from './coordinator.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Semester } from 'src/types/semester';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('coordinator')
export class CoordinatorController {
  constructor(private coordinatorService: CoordinatorService) {}

  @Get('/:year/:semester')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Consult performance metrics for all disciplines',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved unit grades.',
    schema: {
      type: 'object',
      properties: {
        year: { type: 'number' },
        performanceRate: { type: 'number' },
        semester: { type: 'number' },
      },
    },
  })
  findPerformance(
    @Param('year') year: number,
    @Param('semester') semester: Semester,
  ) {
    return this.coordinatorService.findPerformanceForSemester(year, semester);
  }

  @Get('subject/:code/:semester')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get performance metrics for a subject by semester',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved unit grades.',
    schema: {
      type: 'object',
      properties: {
        semester: { type: 'number' },
        approved: { type: 'number' },
        approvedByGrade: { type: 'number' },
        canceled: { type: 'number' },
        Code: { type: 'string' },
        disapproved: { type: 'number' },
        disapprovedByAbsence: { type: 'number' },
        disapprovedByGrade: { type: 'number' },
        disapprovedByGradeAndAbsence: { type: 'number' },
        disapprovedByMeanAbsence: { type: 'number' },
        excluded: { type: 'number' },
        locked: { type: 'number' },
        name: { type: 'string' },
      },
    },
  })
  findSubjectPerformance(
    @Param('code') code: string,
    @Param('semester') semester: string,
  ) {
    return this.coordinatorService.findSubjectPerformanceForSemester(
      code,
      semester,
    );
  }
}
