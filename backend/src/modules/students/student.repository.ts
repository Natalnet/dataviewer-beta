import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  StudentListGrades,
  StudentListGradesDocument,
} from './schemas/studentlistgrades.schema';
import { StudentListGradesPostDto } from './dto/post-student-list-grades.dto';

@Injectable()
export class StudentRepository {
  constructor(
    @InjectModel(StudentListGrades.name)
    private readonly studentListGradesModel: Model<StudentListGradesDocument>,
  ) {}
  async findStudentListById(
    studentId: string,
  ): Promise<StudentListGrades | null> {
    return this.studentListGradesModel
      .findOne({ student_id: studentId })
      .exec();
  }
  async createStudentList(createStudentList: StudentListGradesPostDto) {
    const newStudentList = new this.studentListGradesModel(createStudentList);
    return newStudentList.save();
  }
  async updateStudentList(
    studentId: string,
    updateData: Partial<StudentListGradesPostDto>,
  ): Promise<StudentListGradesPostDto | null> {
    return await this.studentListGradesModel
      .findOneAndUpdate(
        { student_id: studentId },
        { $set: updateData },
        { new: true },
      )
      .exec();
  }
}
