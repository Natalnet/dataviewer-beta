import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentListGradesDto } from './dto/get-student-list-grades.dto';
import { ExamGradesDto } from './dto/get-student-exam-grades.dto';
import { StudentListGrades, StudentListGradesDocument } from './schemas/studentlistgrades.schema';
import { ExamGrades, ExamGradesDocument } from './schemas/examgrades.schema';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(StudentListGrades.name) private readonly studentListGradesModel: Model<StudentListGradesDocument>,
    @InjectModel(ExamGrades.name) private readonly examGradesModel: Model<ExamGradesDocument>
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

  async findExamGrades(mat: string): Promise<ExamGradesDto> {
    const data = await this.examGradesModel.findOne({matricula: mat}).exec(); 
   
    if (!data) return null;

    return {
      grade1: parseFloat(data.nota1), 
      comment1: data.comentario1, 
      grade2: parseFloat(data.nota2),
      comment2: data.comentario2,
      grade3: Number( data.nota3), 
      comment3: data.comentario3
    }; 
  }
  
}
