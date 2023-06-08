import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentListGradesDto } from './dto/get-student-list-grades.dto';
import { StudentListGrades, StudentListGradesDocument } from './schemas/studentlistgrades.schema';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(StudentListGrades.name) private readonly studentListGradesModel: Model<StudentListGradesDocument>
  ) {}

  async findStudentListGrades(id: string): Promise<StudentListGradesDto[]> {

    const data = await this.studentListGradesModel.findOne({student_id: id}).exec();
    if (!data) return [];
    console.log(data['lists']) 

    return data['lists'].map((l) => ({
      fullName: l.description, 
      progress: l.percent,
 
    }));
  }
}
