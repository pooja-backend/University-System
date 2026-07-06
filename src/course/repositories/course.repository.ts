import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../database/course.entity';
import { DataSource, Repository } from 'typeorm';
import { Status } from 'src/status/database/status.entity';
import { Semester } from 'src/semester/database/semester.entity';
import { ListCourseInput } from '../dto/list-course.input';
import { User } from 'src/user/database/user.entity';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Semester)
    private readonly semsesterRepository: Repository<Semester>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * @description adminGetCourse
   * @param adminGetCourseInput
   * @returns
   */
  async getCourse(user: User): Promise<Course | null> {
    const query = await this.courseRepository
      .createQueryBuilder('course')
      .select([
        'course.id',
        'course.course_name',
        'course.course_type',
        'course.total_semesters',
        'status.id',
        'status.name',
        'semesters.id',
        'semesters.semester_number',
      ])
      .leftJoin('course.status', 'status')
      .leftJoin('course.semesters', 'semesters')
      .leftJoin('course.students', 'students')
      .leftJoin('students.user', 'user')
      .where('user.id=:studentId', {
        studentId: user.id,
      })
      .orderBy('semesters.id', 'ASC');

    const result = await query.getOne();
    return result;
  }

  /**
   * @description adminListCourse
   * @param adminListCourseInput
   * @returns
   */
  async listCourse(
    listCourseInput: ListCourseInput,
  ): Promise<[Course[], number]> {
    const query = await this.courseRepository
      .createQueryBuilder('course')
      .select([
        'course.id',
        'course.course_name',
        'course.course_type',
        'course.total_semesters',
        'status.id',
        'status.name',
        'semesters.id',
        'semesters.semester_number',
      ])
      .leftJoin('course.status', 'status')
      .leftJoin('course.semesters', 'semesters');

    if (listCourseInput?.search) {
      query.andWhere('LOWER(course.course_name) LIKE :search', {
        search: `%${listCourseInput.search.toLowerCase()}%`,
      });
    }
    if (listCourseInput.pagination) {
      query.take(listCourseInput.take).skip(listCourseInput.skip);
    }
    const list = await query.getManyAndCount();
    // console.log(list);
    return list;
  }
}
