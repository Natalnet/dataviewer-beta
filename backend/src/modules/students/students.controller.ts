import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StudentsService } from './students.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('students')
export class StudentsController {
  constructor(private studentService: StudentsService) {}

  @Get('listgrades/:id')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Consult a student performance in each exercise list',
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullName: { type: 'string' },
          progress: { type: 'number' },
        },
      },
    },
  })
  findListGradesById(@Param('id') id: string) {
    return this.studentService.findStudentListGrades(id);
  }

  @Get('listgradesbymat/:mat')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get student list grades by registration',
  })
  @ApiResponse({
    status: 200,
    description: 'Student list grades retrieved successfully.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullName: {
            type: 'string',
          },
          progress: {
            type: 'number',
          },
        },
      },
    },
  })
  findListGradesByMat(@Param('mat') mat: string) {
    return this.studentService.findStudentListGradesByMat(mat);
  }

  @Get('listunitgrades/:mat')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Retrieve student unit grades',
    description:
      'Returns the mean grades for units U1, U2, and U3 for the specified student registration number.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved unit grades.',
    schema: {
      type: 'object',
      properties: {
        meanU1: { type: 'string' },
        meanU2: { type: 'string' },
        meanU3: { type: 'string' },
      },
    },
  })
  findListUnitGrades(@Param('mat') mat: string) {
    return this.studentService.findStudentListUnitGrades(mat);
  }

  @UseGuards(JwtAuthGuard)
  @Get('frequency/:mat')
  findStudentFrequency(@Param('mat') mat: string) {
    //return 'frequency'
    return this.studentService.findStudentFrequency(mat);
  }

  @UseGuards(JwtAuthGuard)
  @Get('examgrades/:mat')
  findExamGradesByMat(@Param('mat') mat: string) {
    return this.studentService.findExamGrades(mat);
  }

  @UseGuards(JwtAuthGuard)
  @Get('participations/:mat')
  findStudentParticipationsByMat(@Param('mat') mat: string) {
    return this.studentService.findParticipations(mat);
  }
}
