import { Percentage } from './percentage';

export type Performance = {
  approved: Percentage;
  approvedByGrade: Percentage;
  reproved: Percentage;
  reprovedDueLowGrade: Percentage;
  reprovedDueNonAttendance: Percentage;
  reprovedDueLowGradeAndNonAttendance: Percentage;
};
