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
}