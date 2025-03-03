import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassMetricsDto } from './dto/get-class-metrics.dto';
import { ClassDto } from './dto/get-class.dto';
import { ListSubjectClassDto } from './dto/get-list-subjects.dto';
import { StudentDto } from './dto/get-students.dto';
import { ClassDocument, TClass } from './schemas/class.schema';
import {
  ClassDifficulty,
  ClassDifficultyDocument,
} from './schemas/classdifficulty.schema';
import { ClassListDocument, ClassList } from './schemas/classlist.schema';
import {
  ClassStudents,
  ClassStudentsDocument,
} from './schemas/classstudents.schema';
import {
  ListSubjectClass,
  ListSubjectClassDocument,
} from './schemas/listsubjectclass.schema';
import { Student, StudentDocument } from './schemas/student.schema';
import {
  TeacherClass,
  TeacherClassDocument,
} from './schemas/teacherclass.schema';
import {
  ExamGrades,
  ExamGradesDocument,
} from '../students/schemas/examgrades.schema';
import {
  StudentListGrades,
  StudentListGradesDocument,
} from '../students/schemas/studentlistgrades.schema';
import {
  StudentParticipation,
  StudentParticipationDocument,
} from '../students/schemas/studentparticipation.schema';
import { StudentNamesDto } from './dto/get-class-student-names.dto';
import { ClassClass, ClassClassDocument } from './schemas/classclass.schema';
import { ClassFrequency } from './schemas/classfrequency.schema';
import { CreateSubmissionDto } from './dto/post-submission-count.dto';
import { SubmissionCount, SubmissionCountDocument } from './schemas/submissioncount.schema';

@Injectable({})
export class ClassesService {
  constructor(
    @InjectModel(TClass.name) private readonly classModel: Model<ClassDocument>,
    @InjectModel(TeacherClass.name)
    private readonly teacherClassModel: Model<TeacherClassDocument>,
    @InjectModel(ListSubjectClass.name)
    private readonly listSubjectClass: Model<ListSubjectClassDocument>,
    @InjectModel(ClassList.name)
    private readonly classListModel: Model<ClassListDocument>,
    @InjectModel(ClassDifficulty.name)
    private readonly classDifficultyModel: Model<ClassDifficultyDocument>,
    @InjectModel(ClassStudents.name)
    private readonly classStudentsModel: Model<ClassStudentsDocument>,
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
    @InjectModel(ExamGrades.name)
    private readonly examGradesModel: Model<ExamGradesDocument>,
    @InjectModel(StudentListGrades.name)
    private readonly studentListGradesModel: Model<StudentListGradesDocument>,
    @InjectModel(StudentParticipation.name)
    private readonly stdudentParticipationModel: Model<StudentParticipationDocument>,
    @InjectModel(ClassClass.name)
    private readonly classClassModel: Model<ClassClassDocument>,
    @InjectModel(ClassFrequency.name)
    private readonly classFrequencyModel: Model<ClassFrequency>,
    @InjectModel(SubmissionCount.name)
    private readonly submissionCountModel: Model<SubmissionCountDocument>,
  ) {}

  async findTeacherClasses(userEmail: string): Promise<ClassDto[]> {
    const teacherClassData = await this.teacherClassModel
      .findOne({ email: userEmail })
      .exec();
    //console.log(teacherClassData);
    if (teacherClassData != null) {
      const classIds = teacherClassData['classes'];

      return this.classModel.find({ class_id: { $in: classIds } }).exec();
    }
    return null;
  }

  async findTeacherLastClasses(userEmail: string): Promise<string> {
    const teacherClassData = await this.teacherClassModel
      .findOne({ email: userEmail })
      .exec();
    //console.log(teacherClassData);
    if (teacherClassData != null) {
      const classIds = teacherClassData['classes'];

      const teacherClasses = await this.classModel
        .find({ class_id: { $in: classIds } })
        .exec();
      // guarda o código da turma mais recente
      let lastClassCode = '';
      let lastYear = 0;
      for (const t of teacherClasses) {
        console.log(t);
        const actualYear = Number(t.year) + Number(t.semester) / 10;
        if (actualYear > lastYear) {
          lastClassCode = t.class_code;
          lastYear = actualYear;
        }
      }
      return lastClassCode;
    }
    return '';
  }

  async findOne(id: string): Promise<ClassDto> {
    return this.classModel.findOne({ class_id: id }).exec();
  }

  async findListSubjectClass(id: string): Promise<ListSubjectClassDto[]> {
    // Realiza tratamento de exceção
    const data = await this.listSubjectClass.findOne({ class_id: id }).exec();
    if (!data) return [];
    return data['tags'].map((l) => ({
      fullName: l.subject,
      name: l.subject,
      acertos: l.qt_acertos,
      erros: l.qt_erros,
      restantes: l.qt_nao_fez,
    }));
  }

  async findClassLists(id: string): Promise<ClassMetricsDto[]> {
    // Realiza tratamento de exceção
    const data = await this.classListModel.findOne({ class_id: id }).exec();

    if (!data) return [];
    return data.lists.map((l) => ({
      fullName: l.description,
      name: l.description,
      acertos: l.qt_acertos,
      erros: l.qt_erros,
      restantes: l.qt_nao_fez,
    }));
  }

  async findClassDifficulties(id: string): Promise<ClassMetricsDto[]> {
    const data = await this.classDifficultyModel
      .findOne({ class_id: id })
      .exec();
    if (!data) return [];
    return data.difficulty.map((d) => ({
      fullName: d.level,
      name: d.level,
      acertos: d.qt_acertos,
      erros: d.qt_erros,
      restantes: d.qt_nao_fez,
    }));
  }

  async findClassStudents(classId: string): Promise<StudentDto[]> {
    const data = await this.classStudentsModel
      .findOne({ class_id: classId })
      .exec();
    if (!data) return [];
    const arrayStudentIds = data['students'].map((s) => s['student_id']);
    const studentArray = await this.studentModel
      .find({ id: { $in: arrayStudentIds } })
      .exec();
    return studentArray.map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      progress: s.percent,
    }));
  }

  async findClassOverallPerformance(classCode: string) {
    const data = await this.classStudentsModel
      .findOne({ class_code: classCode })
      .exec();
    if (!data) return [];

    //return this.classModel.find({ class_id: { $in: classIds } }).exec();
    const grades = await this.examGradesModel
      .find({ matricula: { $in: data.reg_students } })
      .exec();
    const lists = await this.studentListGradesModel
      .find({ reg_num: { $in: data.reg_students } })
      .exec();
    const participations = await this.stdudentParticipationModel
      .find({ matricula: { $in: data.reg_students } })
      .exec();

    const overallPerformance = {};
    for (const g of grades) {
      overallPerformance[String(g.matricula)] = {};
      overallPerformance[String(g.matricula)].grade1 = g.nota1;
      overallPerformance[String(g.matricula)].grade2 = g.nota2;
      overallPerformance[String(g.matricula)].grade3 = g.nota3;
    }
    for (const l of lists) {
      overallPerformance[String(l.reg_num)].list1 = l.meanU1;
      overallPerformance[String(l.reg_num)].list2 = l.meanU2;
      overallPerformance[String(l.reg_num)].list3 = l.meanU3;
    }
    for (const p of participations) {
      overallPerformance[String(p.matricula)].presence1 = (
        (parseFloat(p.presenca1) + parseFloat(p.atividade1)) /
        2
      ).toFixed(2);
      overallPerformance[String(p.matricula)].presence2 = (
        (parseFloat(p.presenca2) + parseFloat(p.atividade2)) /
        2
      ).toFixed(2);
      overallPerformance[String(p.matricula)].presence3 = (
        (parseFloat(p.presenca3) + parseFloat(p.atividade3)) /
        2
      ).toFixed(2);
    }

    return overallPerformance;
  }

  async findClassStudentNames(classCode: string): Promise<StudentNamesDto[]> {
    const data = await this.classStudentsModel
      .findOne({ class_code: classCode })
      .exec();
    if (!data || !data.students) return [];

    return data.students.map((s) => ({
      name: s['name'],
      regNum: s['reg_num'],
      subClass: s['sub_class'],
    }));
  }

  async findClassTitles(classCode: string): Promise<ClassClassDto[]> {
    const data = await this.classClassModel
      .findOne({ classCode: classCode })
      .exec();

    if (!data) return [];

    return data.classTitles.map((c) => ({
      date: c.date,
      classTitle: c.classTitle,
    }));
  }

  async findClassFrequencies(classCode: string): Promise<ClassFrequencyDto> {
    const data = await this.classFrequencyModel
      .findOne({ classCode: classCode })
      .exec();

    if (!data) return null;

    return {
      classFreqs: data.classFreqs,
      studentNumber: data.studentNumber,
    };
  }

  async findSubmissionCount(class_Code: string) {
    const data = await this.submissionCountModel
      .findOne({ classCode: class_Code })
      .exec();

    if (!data) return [];
    return {
      datas: data.counts,
    };
  }

  async createSubmissionCount(createSubmission: CreateSubmissionDto) {
    let result;
    try {
      if (
        !createSubmission.classCode ||
        createSubmission.classCode.trim() == ''
      ) {
        throw 'O campo classCode não pode estar vazio';
      }
      if (
        !Array.isArray(createSubmission.counts) ||
        createSubmission.counts.length == 0
      ) {
        throw 'Campo counts não é um lista de array ou está vazia.';
      }

      const existingData = await this.submissionCountModel
        .findOne({ classCode: createSubmission.classCode })
        .exec();
      if (existingData) {
        result = await this.submissionCountModel.updateOne(
          { classCode: createSubmission.classCode },
          { $set: { counts: createSubmission.counts } },
        );
        return { message: 'Dados atualizados com sucesso.' };
      } else {
        result = await new this.submissionCountModel({
          counts: createSubmission.counts,
          classCode: createSubmission.classCode,
        }).save();
        return {
          classCode: result.classCode,
          counts: result.counts,
        };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

}
