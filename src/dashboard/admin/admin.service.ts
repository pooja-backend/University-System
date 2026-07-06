import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminDashboardRepository } from '../repositories/admin/admin.repository';
import { AdminTotalCountEntity } from '../entities/admin/admin-total-count.entity';
import { I18nService } from 'nestjs-i18n';
import { AdminTotalCountResponse } from '../response/admin/admin-total-count.response';

@Injectable()
export class AdminDashboardService {
  constructor(
    private readonly adminDashboardRepository: AdminDashboardRepository,
    private readonly i18n: I18nService,
  ) {}

  /**
   * @description Count of active course,student,subject,semester in admin panel
   * @returns
   */
  async adminDashboardCount(): Promise<AdminTotalCountEntity> {
    const count = await this.adminDashboardRepository.adminDashboardCount();
    if (!count) {
      throw new NotFoundException(this.i18n.t('student.STUDENT_NOT_FOUND'));
    }
    return AdminTotalCountResponse.decode({
      activeStudentCount: count.activeTotalStudent,
      activeCourseCount: count.activeTotalCourse,
      activeSubjectCount: count.activeTotalSubject,
      activeSemestertCount: count.activeTotalSemester,
    });
  }
}
