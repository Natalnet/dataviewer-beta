import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

class StudentList {
 
  description: string;
  
  percent: number;
}

export class StudentListGradesPostDto {
  @ApiProperty()
  student_id: string;
  @ApiPropertyOptional()
  reg_num?: string;
  @ApiProperty()
  meanU1: string;
  @ApiProperty()
  meanU2: string;
  @ApiProperty()
  meanU3: string;
  @ApiProperty({ 
    type: () => ({
      description: { type: 'string' },
      percent: { type: 'number' },
    }),
    isArray: true,
  })
  lists: StudentList[];
}
