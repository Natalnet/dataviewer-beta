import { Controller, Get, Param } from "@nestjs/common"
import { ClassesService } from "./classes.service"

@Controller('classes')
export class ClassesController {
  constructor(private classesService: ClassesService){}

  @Get()
  findTeacherClasses(){
    return this.classesService.findTeacherClasses() 
  }

  @Get(':id') 
  findById(@Param('id') id: string) {
    console.log(id) 
    return this.classesService.findOne(id) 
  }

}