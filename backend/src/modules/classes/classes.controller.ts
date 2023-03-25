import { Controller, Get } from "@nestjs/common"
import { ClassesService } from "./classes.service"

@Controller('classes')
export class ClassesController {
  constructor(private classesService: ClassesService){}

  @Get()
  findTeacherClasses(){
    return this.classesService.findTeacherClasses() 
  }

}