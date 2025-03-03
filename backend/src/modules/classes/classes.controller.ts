import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { RequestWithUser } from 'src/types/requests';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SubmissionCount } from './schemas/submissioncount.schema';
import { CreateSubmissionDto } from './dto/post-submission-count.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('classes')
export class ClassesController {
  constructor(private classesService: ClassesService) {}

  @Get()
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get classes taught by the logged-in teacher' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          class_id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          year: { type: 'number' },
          semester: { type: 'number' },
          description: { type: 'string' },
        },
      },
    },
  })
  findTeacherClasses(@Req() req: RequestWithUser) {
    console.log(req.user.userEmail);
    return this.classesService.findTeacherClasses(req.user.userEmail);
  }

  @Get(':id')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get class details by ID' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          class_id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          year: { type: 'number' },
          semester: { type: 'number' },
          description: { type: 'string' },
        },
      },
    },
  })
  findById(@Param('id') id: string) {
    return this.classesService.findOne(id);
  }

  @Get('listsubject/:id')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get the performance of a class in each subject' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullname: { type: 'string' },
          acertos: { type: 'number' },
          erros: { type: 'number' },
          restante: { type: 'number' },
        },
      },
    },
  })
  findListSubject(@Param('id') id: string) {
    return this.classesService.findListSubjectClass(id);
  }

  @Get('lists/:id')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get the performance of a class in each list' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullname: { type: 'string' },
          acertos: { type: 'number' },
          erros: { type: 'number' },
          restante: { type: 'number' },
        },
      },
    },
  })
  findLists(@Param('id') id: string) {
    return this.classesService.findClassLists(id);
  }

  @Get('difficulties/:id')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get class performance for the difficulty levels of the questions',
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullname: { type: 'string' },
          acertos: { type: 'number' },
          erros: { type: 'number' },
          restante: { type: 'number' },
        },
      },
    },
  })
  findDifficulties(@Param('id') id: string) {
    return this.classesService.findClassDifficulties(id);
  }

  @Get('students/:id')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get the overall performance of students in an class',
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          progress: { type: 'number' },
          id: { type: 'string' },
        },
      },
    },
  })
  findStudents(@Param('id') id: string) {
    return this.classesService.findClassStudents(id);
  }

  @Get('overallperformance/:class_code')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get overall performance of students in a class' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          list1: { type: 'number', description: 'Mean of List 1' },
          list2: { type: 'number', description: 'Mean of List 2' },
          list3: { type: 'number', description: 'Mean of List 3' },
          grade1: { type: 'number', description: 'Grade 1' },
          grade2: { type: 'number', description: 'Grade 2' },
          grade3: { type: 'number', description: 'Grade 3' },
          presence1: { type: 'string' },
          presence2: { type: 'string' },
          presence3: { type: 'string' },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Class not found' })
  findStudentsOverallPerformance(@Param('class_code') code: string) {
    return this.classesService.findClassOverallPerformance(code);
  }

  @Get('studantnames/:class_code')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get the names of students in a class' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          regNum: { type: 'number' },
          subClass: { type: 'string' },
        },
      },
    },
  })
  findStudentNames(@Param('class_code') classCode: string) {
    return this.classesService.findClassStudentNames(classCode);
  }

  @Get('teacher/last')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get the most recent class of the teacher' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        lastClassCode: { type: 'string' },
      },
    },
  })
  findLastClass(@Req() req: RequestWithUser) {
    //console.log(req);
    return this.classesService.findTeacherLastClasses(req.user.userEmail);
  }

  @Get('classes/:class_code')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get titles of classes by code' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the class titles.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          date: { type: 'string' },
          classTitle: { type: 'string' },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Class code not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.'})
  findClassTitles(@Param('class_code') classCode: string) {
    return this.classesService.findClassTitles(classCode);
  }

  @Get('frequency/:class_code')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get frequency details of a class by class code' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the class frequency details.',
    schema: {
      type: 'object',
      properties: {
        classFreqs: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              date: { type: 'string' },
              frequency: { type: 'number' },
            },
          },
        },
        studentNumber: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Class code not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findClassFrequency(@Param('class_code') classCode: string) {
    return this.classesService.findClassFrequencies(classCode);
  }

  @Get('submissioncount/:class_Code')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get submission count by class code' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the submission count details.'
  })
  findSubmissionCount(@Param('class_Code') class_Code: string) {
    return this.classesService.findSubmissionCount(class_Code);
  }

  @Post('submissioncount/')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new submission count' })
  @ApiResponse({
    status: 201,
    description: 'Submission count created successfully',
  })
  createSubmissionCount(@Body() newSubmission: CreateSubmissionDto) {
    return this.classesService.createSubmissionCount(newSubmission);
  }
}
