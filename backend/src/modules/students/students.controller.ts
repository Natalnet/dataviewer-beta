import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private studentService: StudentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('listgrades/:id')
  findListGradesById(@Param('id') id: string) {
    return this.studentService.findStudentListGrades(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('listgradesbymat/:mat')
  findListGradesByMat(@Param('mat') mat: string) {
    return this.studentService.findStudentListGradesByMat(mat);
  }

  @Get('listunitgrades/:mat')
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
