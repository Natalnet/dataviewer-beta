import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StudentsService } from './students.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudentListGradesPostDto } from './dto/post-student-list-grades.dto';

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

  @Post('listgrades')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
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

  @Get('frequency/:mat')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
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

  @Get('examgrades/:mat')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
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

  @Get('participations/:mat')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
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
