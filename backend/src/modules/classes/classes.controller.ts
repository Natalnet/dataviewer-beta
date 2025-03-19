import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { RequestWithUser } from 'src/types/requests';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('classes')
export class ClassesController {
  constructor(private classesService: ClassesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findTeacherClasses(@Req() req: RequestWithUser) {
    console.log(req.user.userEmail);
    return this.classesService.findTeacherClasses(req.user.userEmail);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.classesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('listsubject/:id')
  findListSubject(@Param('id') id: string) {
    return this.classesService.findListSubjectClass(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('lists/:id')
  findLists(@Param('id') id: string) {
    return this.classesService.findClassLists(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('difficulties/:id')
  findDifficulties(@Param('id') id: string) {
    return this.classesService.findClassDifficulties(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('students/:id')
  findStudents(@Param('id') id: string) {
    return this.classesService.findClassStudents(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('overallperformance/:class_code')
  findStudentsOverallPerformance(@Param('class_code') code: string) {
    return this.classesService.findClassOverallPerformance(code);
  }

  @UseGuards(JwtAuthGuard)
  @Get('studantnames/:class_code')
  findStudentNames(@Param('class_code') classCode: string) {
    return this.classesService.findClassStudentNames(classCode);
  }

  @UseGuards(JwtAuthGuard)
  @Get('teacher/last')
  findLastClass(@Req() req: RequestWithUser) {
    return this.classesService.findTeacherLastClasses(req.user.userEmail);
  }

  @UseGuards(JwtAuthGuard)
  @Get('classes/:class_code')
  findClassTitles(@Param('class_code') classCode: string) {
    return this.classesService.findClassTitles(classCode);
  }

  @Get('frequency/:class_code')
  findClassFrequency(@Param('class_code') classCode: string) {
    return this.classesService.findClassFrequencies(classCode);
  }
}
