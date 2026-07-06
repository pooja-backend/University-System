import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeesStructure } from '../database/fee.entity';
import { Course } from 'src/course/database/course.entity';
import { Repository } from 'typeorm';
import { Semester } from 'src/semester/database/semester.entity';
import { ListFeesInput } from '../dto/list-fees.input';
import { User } from 'src/user/database/user.entity';

@Injectable()
export class FeeRepository {
  constructor(
    @InjectRepository(FeesStructure)
    private feesRepository: Repository<FeesStructure>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Semester)
    private semesterRepository: Repository<Semester>,
  ) {}
  /**
   * @description Get fees detail by id
   * @param getFeesInput
   * @returns
   */
  async getFees(user: User): Promise<FeesStructure | null> {
    const query = await this.feesRepository
      .createQueryBuilder('fees')
      .select([
        'fees.id',
        'fees.tuition_fee',
        'fees.exam_fee',
        'fees.library_fee',
        'fees.other_fee',
        'fees.total_fee',
        'course.id',
        'course.course_name',
        'semester.id',
      ])
      .leftJoin('fees.course', 'course')
      .leftJoin('course.students', 'students')
      .leftJoin('students.user', 'user')
      .leftJoin('fees.semester', 'semester')
      .where('user.id=:studentId', { studentId: user.id });

    const result = await query.getOne();
    return result;
  }

  /**
   * @description list fees details
   * @param listFeesInput
   * @returns
   */
  async listFees(
    listFeesInput: ListFeesInput,
  ): Promise<[FeesStructure[], number]> {
    const query = await this.feesRepository
      .createQueryBuilder('fees')
      .select([
        'fees.id',
        'fees.tuition_fee',
        'fees.exam_fee',
        'fees.library_fee',
        'fees.other_fee',
        'fees.total_fee',
        'course.id',
        'course.course_name',
        'semester.id',
      ])
      .leftJoin('fees.course', 'course')
      .leftJoin('fees.semester', 'semester');

    if (listFeesInput.pagination) {
      query.take(listFeesInput.take).skip(listFeesInput.skip);
    }

    const result = await query.getManyAndCount();
    return result;
  }
}
