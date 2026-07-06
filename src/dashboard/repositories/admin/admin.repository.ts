import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/course/database/course.entity';
import { Semester } from 'src/semester/database/semester.entity';
import { Student } from 'src/student/database/student.entity';
import { Subject } from 'src/subject/database/subject.entity';
import { User } from 'src/user/database/user.entity';
import { StatusEnum } from 'src/user/enums/status.enums';
import { Repository } from 'typeorm';

@Injectable()
export class AdminDashboardRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(Semester)
    private semesterRepository: Repository<Semester>,
  ) {}

  /**
   * @description Count of active course,student,subject,semester in admin panel
   * @returns
   */
  async adminDashboardCount(): Promise<{
    activeTotalStudent: number;
    activeTotalCourse: number;
    activeTotalSemester: number;
    activeTotalSubject: number;
  }> {
    const activeTotalStudent = await this.studentRepository.count({
      where: { user: { status: { id: StatusEnum.ACTIVE } } },
    });

    const activeTotalCourse = await this.courseRepository.count({
      where: { status: { id: StatusEnum.ACTIVE } },
    });

    const activeTotalSemester = await this.semesterRepository.count({
      where: { course: { status: { id: StatusEnum.ACTIVE } } },
    });

    const activeTotalSubject = await this.subjectRepository.count({
      where: { course: { status: { id: StatusEnum.ACTIVE } } },
    });

    return {
      activeTotalStudent,
      activeTotalCourse,
      activeTotalSemester,
      activeTotalSubject,
    };
  }
}
