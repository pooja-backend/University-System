import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminStudentResultRepository } from '../repositories/admin.repository';
import { I18nService } from 'nestjs-i18n';
import { BooleanMessage } from 'src/user/entities/boolean-message.entity';

import { AdminCreateStudentResultInput } from '../dto/admin/admin-create-student-result.input';
import { AdminGetStudentResultInput } from '../dto/admin/admin-get-student-result.input';
import { AdminGetStudentResultEntity } from '../entities/admin/admin-get-student-result.entity';
import { AdminGetStudentResultResponse } from '../response/admin/admin-get-student-result.response';
import { AdminListStudentResultInput } from '../dto/admin/admin-list-student-result.input';
import { AdminListStudentResultEntity } from '../entities/admin/admin-list-student-result.entity';
import { AdminListStudentResultResponse } from '../response/admin/admin-list-student-result.response';
import { AdminDeleteStudentResultInput } from '../dto/admin/admin-delete-student-result.input';
import { AdminUpdateStudentResultInput } from '../dto/admin/admin-update-student-result.input';

@Injectable()
export class AdminStudentResultService {
  constructor(
    private readonly adminStudentResultRepository: AdminStudentResultRepository,
    private readonly i18n: I18nService,
  ) {}

  /**
   * @description Admin will create result of Student
   * @param adminCreateStudentInput
   */
  async adminCreateStudentResult(
    adminCreateStudentResultInput: AdminCreateStudentResultInput,
  ): Promise<BooleanMessage> {
    await this.adminStudentResultRepository.adminCreateStudentResult(
      adminCreateStudentResultInput,
    );

    const response = new BooleanMessage();
    response.success = true;
    response.message = this.i18n.t(
      'student-result.STUDENT_RESULT_CREATED_SUCCESSFULLY',
    );
    return response;
  }

  /**
   * @description Admin will get student result by id
   * @param adminGetStudentResultInput
   * @returns StudentResult
   */
  async adminGetStudentResult(
    adminGetStudentResultInput: AdminGetStudentResultInput,
  ): Promise<AdminGetStudentResultEntity> {
    const studentResult =
      await this.adminStudentResultRepository.adminGetStudentResult(
        adminGetStudentResultInput,
      );

    if (!studentResult) {
      throw new NotFoundException(
        this.i18n.t('student-result.STUDENT_RESULT_NOT_FOUND'),
      );
    }
    return AdminGetStudentResultResponse.decode({
      studentResults: studentResult,
    });
  }

  /**
   * @description Admin will list the all student by pagination or search
   * @param adminListStudentResultInput
   * @returns Student
   */

  async adminListStudentResult(
    adminListStudentResultInput: AdminListStudentResultInput,
  ): Promise<AdminListStudentResultEntity> {
    const [studentResults, count] =
      await this.adminStudentResultRepository.adminListStudentResult(
        adminListStudentResultInput,
      );

    if (!studentResults.length) {
      this.i18n.t('student-result.STUDENT_RESULT_NOT_FOUND');
    }
    return AdminListStudentResultResponse.decode({
      studentResults: studentResults,
      count: count,
    });
  }

  /**
   * @description Admin will update existing Student result
   * @param adminUpdateStudentInput
   */
  async adminUpdateStudentResult(
    adminUpdateStudentResultInput: AdminUpdateStudentResultInput,
  ): Promise<BooleanMessage> {
    await this.adminStudentResultRepository.adminUpdateStudentResult(
      adminUpdateStudentResultInput,
    );

    const response = new BooleanMessage();
    response.success = true;
    response.message = this.i18n.t(
      'student-result.STUDENT_RESULT_UPDATED_SUCCESSFUULY',
    );
    return response;
  }
  /**
   * @description Admin can delete the student linked with user
   * @param adminDeleteStudentResultInput
   */
  async adminDeleteStudentResult(
    adminDeleteStudentResultInput: AdminDeleteStudentResultInput,
  ): Promise<BooleanMessage> {
    await this.adminStudentResultRepository.adminDeleteStudentResult(
      adminDeleteStudentResultInput,
    );

    const response = new BooleanMessage();
    response.success = true;
    response.message = this.i18n.t(
      'student-result.STUDENT_RESULT_DELETED_SUCCESSFULLY',
    );
    return response;
  }
}
