import { Injectable } from "@nestjs/common"
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassDto } from "./dto/get-class.dto";
import { ClassDocument, TClass } from "./schemas/class.schema";
import { TeacherClass, TeacherClassDocument } from "./schemas/teacherClass.schema";

@Injectable({})
export class ClassesService {
  constructor(
    @InjectModel(TClass.name) private readonly classModel: Model<ClassDocument>, 
    @InjectModel(TeacherClass.name) private readonly teacherClassModel: Model<TeacherClassDocument> 
  ) {}

  async findTeacherClasses(userEmail: string): Promise<ClassDto[]> {    
    const teacherClassData = await this.teacherClassModel.findOne( {email: userEmail} ).exec() 
    //console.log(teacherClassData['classes']) 
    const classIds = teacherClassData['classes'] 
    return this.classModel.find( { class_id: {$in : classIds }} ).exec() 
  }

  async findOne(id: string): Promise<ClassDto> {
    return this.classModel.findOne( {class_id: id} ).exec() 
  }
}