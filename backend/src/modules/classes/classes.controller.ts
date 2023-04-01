import { Controller, Get, Param, Request, UseGuards } from "@nestjs/common"
import { ClassesService } from "./classes.service"
import { RequestWithUser } from 'src/types/Requests';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('classes')
export class ClassesController {
  constructor(private classesService: ClassesService){}

  @UseGuards(JwtAuthGuard)
  @Get()
  findTeacherClasses(@Request() req: RequestWithUser){    
    //console.log(req.user)  
    return this.classesService.findTeacherClasses(req.user.userEmail) 
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id') 
  findById(@Param('id') id: string) {
    return this.classesService.findOne(id) 
  }

  @Get('listsubject/:id') 
  findListSubject(@Param('id') id: string ) {
    return this.classesService.findListSubjectClass(id) 
  }

  @Get('lists/:id') 
  findLists(@Param('id') id: string ) {
    return this.classesService.findClassLists(id) 
  }
}