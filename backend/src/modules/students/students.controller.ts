import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StudentsService } from './students.service';
import { StudentListGradesPostDto } from './dto/post-student-list-grades.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('students')
export class StudentsController {
  constructor(private studentService: StudentsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Consilt a student performance in each exercise list',
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
  @Get('listgrades/:id')
  findListGradesById(@Param('id') id: string) {
    return this.studentService.findStudentListGrades(id);
  }

  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @Get('listgradesbymat/:mat')
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
  @ApiOperation({
    summary: 'Retrieve student unit grades',
    description: 'Returns the mean grades for units U1, U2, and U3 for the specified student registration number.',
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

  @Post('listgrades')
  @ApiOperation({
    summary: 'Create new student list grades',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created the list grades.',
    schema: {
      type: 'object',
      properties: {
        student_id: { type: 'string' },
        meanU1: { type: 'string' },
        meanU2: { type: 'string' },
        meanU3: { type: 'string' },
        lists: {
          type: 'array',
          items: {
            type: 'object',
          },
        },
      },
    },
  })
  createListGrades(@Body() request: StudentListGradesPostDto) {
    return this.studentService.createStudentListGrades(request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('frequency/:mat')
  @ApiOperation({
    summary: 'Consult student frequency information',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the frequency data.',
    schema: {
      type: 'object',
      properties: {
        classCode: { type: 'string' },
        classFreqs: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  })
  findStudentFrequency(@Param('mat') mat: string) {
    //return 'frequency'
    return this.studentService.findStudentFrequency(mat);
  }

  @UseGuards(JwtAuthGuard)
  @Get('examgrades/:mat')
  @ApiOperation({
    summary: 'Consult grades for each exam in a student subject',
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          grade1: { type: 'number' },
          comment1: { type: 'number' },
          grade2: { type: 'number' },
          comment2: { type: 'number' },
          grade3: { type: 'number' },
          comment3: { type: 'number' },
        },
      },
    },
  })
  findExamGradesByMat(@Param('mat') mat: string) {
    return this.studentService.findExamGrades(mat);
  }

  @UseGuards(JwtAuthGuard)
  @Get('participations/:mat')
  @ApiOperation({
    summary: 'Get a student participation performance in each unit',
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          presence1: { type: 'number' },
          activities1: { type: 'number' },
          presence2: { type: 'number' },
          activities2: { type: 'number' },
          presence3: { type: 'number' },
          activities3: { type: 'number' },
        },
      },
    },
  })
  findStudentParticipationsByMat(@Param('mat') mat: string) {
    return this.studentService.findParticipations(mat);
  }
}
