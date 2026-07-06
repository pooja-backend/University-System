import { plainToInstance } from 'class-transformer';

export class AdminTotalCountResponse {
  activeStudentCount: number;
  activeCourseCount: number;
  activeSubjectCount: number;
  activeSemestertCount: number;

  static decode(input: any): AdminTotalCountResponse {
    return plainToInstance(this, input);
  }
}
