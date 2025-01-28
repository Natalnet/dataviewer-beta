import { ApiProperty } from '@nestjs/swagger';
class Counter {
  date: string;
  count: number;
}
export class CreateSubmissionDto {
  @ApiProperty()
  classCode: string;

  @ApiProperty({
    type: () => ({
      date: { type: 'string' },
      count: { type: 'number' },
    }),
    isArray: true,
  })
  counts: [];
}
