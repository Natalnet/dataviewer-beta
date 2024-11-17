import { IsOptional } from 'class-validator';

class StudentList {
  description: string;
  percent: number;
}

export class StudentListGradesPostDto {
  student_id: string;

  @IsOptional()
  reg_num?: string;

  meanU1: string;
  meanU2: string;
  meanU3: string;
  lists: StudentList[];
}
