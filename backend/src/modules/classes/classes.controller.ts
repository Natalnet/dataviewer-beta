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

  @Get(':id') 
  findById(@Param('id') id: string) {
    console.log(id) 
    return this.classesService.findOne(id) 
  }

}