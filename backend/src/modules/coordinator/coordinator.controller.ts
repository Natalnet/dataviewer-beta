import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CoordinatorService } from './coordinator.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Semester } from 'src/types/semester';

@Controller('coordinator')
export class CoordinatorController {
  constructor(private coordinatorService: CoordinatorService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:year/:semester')
  findPerformance(
    @Param('year') year: number,
    @Param('semester') semester: Semester,
  ) {
    return this.coordinatorService.findPerformanceForSemester(year, semester);
  }
}
