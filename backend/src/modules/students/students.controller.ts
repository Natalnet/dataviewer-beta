import { Controller, Get, Param } from '@nestjs/common';

@Controller('students')
export class StudentsController {
  constructor() {}

  @Get('listgrades/:id')
  findListGradesById(@Param('id') id: string) {
    console.log(id)
    return 'oi'; 
  }
}
