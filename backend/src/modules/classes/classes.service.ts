import { Injectable } from "@nestjs/common"

@Injectable({})
export class ClassesService {
  findTeacherClasses() {
    return "Classes!!!" 
  }
}