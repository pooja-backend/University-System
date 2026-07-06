import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentResultRepository } from './repositories/student-result.repository';
import { User } from 'src/user/database/user.entity';
import { I18nService } from 'nestjs-i18n';
import { GetStudentResponse } from 'src/student/response/get-student.response';
import { GetStudentResultsResponse } from './response/get-student-result.response';
import { GetStudentResultsEntity } from './entities/get-student-result.entity';
import { BooleanMessage } from 'src/user/entities/boolean-message.entity';

@Injectable()
export class StudentResultService {
  constructor(
    private readonly studentResultRepository: StudentResultRepository,
    private readonly i18n: I18nService,
  ) {}

  /**
   * @description Get student result with full detail
   * @param user
   * @returns
   */

  async getStudentResult(user: User): Promise<GetStudentResultsEntity> {
    const studentResult =
      await this.studentResultRepository.getStudentResult(user);

    if (!studentResult) {
      throw new NotFoundException(
        this.i18n.t('student-result.STUDENT_RESULT_NOT_FOUND'),
      );
    }
    // return new BooleanMessage();
      return GetStudentResultsResponse.decode({studentResult:studentResult})
  }
}
