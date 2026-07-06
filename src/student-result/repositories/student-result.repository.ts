import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentResult } from '../database/student-result.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/database/user.entity';

@Injectable()
export class StudentResultRepository {
  constructor(
    @InjectRepository(StudentResult)
    private studentResultRepository: Repository<StudentResult>,
  ) {}

  /**
   * @description Get student result with full detail
   * @param user
   * @returns
   */

  async getStudentResult(user: User): Promise<StudentResult | null> {
    const query = await this.studentResultRepository
      .createQueryBuilder('student_result')
      .leftJoinAndSelect('student_result.student', 'student')
      .leftJoinAndSelect('student_result.course', 'course')
      // .leftJoinAndSelect('course.semesters', 'semester')
      .leftJoinAndSelect('student.user', 'user')
      .where('user.id=:studentId', { studentId: user.id });

    const result = await query.getOne();
    console.log(result);
    return result;
  }
}
