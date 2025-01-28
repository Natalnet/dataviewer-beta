import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClassesService } from './classes.service';
import { RequestWithUser } from 'src/types/requests';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Express } from 'express';
import { SubmissionCount } from './schemas/submissioncount.schema';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('classes')
export class ClassesController {
  constructor(private classesService: ClassesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
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

  @UseGuards(JwtAuthGuard)
  @Get('listsubject/:id')
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

  @UseGuards(JwtAuthGuard)
  @Get('lists/:id')
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

  @UseGuards(JwtAuthGuard)
  @Get('difficulties/:id')
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

  @UseGuards(JwtAuthGuard)
  @Get('students/:id')
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

  @UseGuards(JwtAuthGuard)
  @Get('overallperformance/:class_code')
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

  @UseGuards(JwtAuthGuard)
  @Get('studantnames/:class_code')
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

  @UseGuards(JwtAuthGuard)
  @Get('teacher/last')
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

  @UseGuards(JwtAuthGuard)
  @Get('classes/:class_code')
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

  @UseGuards(JwtAuthGuard)
  @Get('frequency/:class_code')
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
  @ApiOperation({ summary: 'Get submission count by class code' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the submission count details.'
  })
  findSubmissionCount(@Param('class_Code') class_Code: string) {
    return this.classesService.findSubmissionCount(class_Code);
  }
  @Post('submissioncount/')
  @ApiOperation({ summary: 'Create a new submission count' })
  @ApiResponse({
    status: 201,
    description: 'Submission count created successfully',
  })
  createSubmissionCount(@Body() newSubmission: CreateSubmissionDto) {
    return this.classesService.createSubmissionCount(newSubmission);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    if (!file) {
      throw new BadRequestException('File not provided');
    }
    return this.classesService.processUpload(file, body);
  }
}
