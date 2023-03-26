import { Injectable } from "@nestjs/common"
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassDto } from "./dto/get-class.dto";
import { ClassDocument, TClass } from "./schemas/class.schema";

@Injectable({})
export class ClassesService {
  constructor(@InjectModel(TClass.name) private readonly classModel: Model<ClassDocument> ) {}

  findTeacherClasses() {
    return "Classes!!!" 
  }

  async findOne(id: string): Promise<ClassDto> {
    return this.classModel.findOne( {class_id: id} ).exec() 
  }
}