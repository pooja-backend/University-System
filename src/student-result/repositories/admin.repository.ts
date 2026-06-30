import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/database/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Course } from 'src/course/database/course.entity';
import { Semester } from 'src/semester/database/semester.entity';
import { I18nService } from 'nestjs-i18n';
import { StudentResult } from '../database/student-result.entity';
import { AppDataSource } from 'app-data-source';
import { AdminCreateStudentResultInput } from '../dto/admin/admin-create-student-result.input';
import { Student } from 'src/student/database/student.entity';
import { AdminGetStudentResultInput } from '../dto/admin-get-student-result.input';
import { AdminListStudentResultInput } from '../dto/admin-list-student-result.input';
import { AdminDeleteStudentResultInput } from '../dto/admin/admin-delete-student-result.input';
import { AdminUpdateStudentResultInput } from '../dto/admin/admin-update-student-result.input';

@Injectable()
export class AdminStudentResultRepository {
  constructor(
    @InjectRepository(StudentResult)
    private studentResultRepository: Repository<StudentResult>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Semester)
    private semesterRepository: Repository<Semester>,
    private readonly i18n: I18nService,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * @description Admin will create new Student
   * @param adminCreateStudentInput
   */

  async adminCreateStudentResult(
    adminCreateStudentResultInput: AdminCreateStudentResultInput,
  ): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const course = await queryRunner.manager.findOne(Course, {
        where: { id: adminCreateStudentResultInput.course_id },
      });

      if (!course) {
        throw new NotFoundException(this.i18n.t('course.COURSE_NOT_FOUND'));
      }

      const semester = await queryRunner.manager.findOne(Semester, {
        where: { id: adminCreateStudentResultInput.semester_id },
        relations: {
          course: true,
        },
      });

      if (!semester) {
        throw new NotFoundException(this.i18n.t('semester.SEMESTER_NOT_FOUND'));
      }

      // Validate semester belongs to selected course
      if (semester.course.id !== course.id) {
        throw new BadRequestException(
          this.i18n.t('semester.SEMESTER_NOT_LINKED'),
        );
      }
      // check student existing for creating result
      const existingStudent = await queryRunner.manager.findOne(Student, {
        where: { id: adminCreateStudentResultInput.student_id },
        relations: { course: true },
      });

      if (!existingStudent) {
        throw new BadRequestException(this.i18n.t('student.STUDENT_NOT_FOUND'));
      }
      // Student should be valid course ID
      if (existingStudent.course.id !== course.id) {
        throw new BadRequestException(
          this.i18n.t('student.STUDENT_NOT_LINKED_COURSE'),
        );
      }
      const existingStudentResults = await queryRunner.manager.findOne(
        StudentResult,
        {
          where: {
            student: { id: adminCreateStudentResultInput.student_id },
            semester: { id: adminCreateStudentResultInput.semester_id },
          },
          relations: { semester: true, student: true },
        },
      );
      if (existingStudentResults) {
        throw new BadRequestException(
          this.i18n.t('student-result.STUDENT_RESULT_ALREADY_EXIST'),
        );
      }
      const studentResult = new StudentResult();

      studentResult.marks = adminCreateStudentResultInput.marks;
      studentResult.grade_points = adminCreateStudentResultInput.grade_points;
      studentResult.course = course;
      studentResult.semester = semester;
      studentResult.student = existingStudent;
      studentResult.result = adminCreateStudentResultInput.result;

      await queryRunner.manager.save(StudentResult, studentResult);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error) {
        throw new NotFoundException(error);
      }
      throw new NotFoundException(this.i18n.t('common.SOMETHING_WENT_WRONG'));
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * @description Admin will get student result by id
   * @param adminGetStudentResultInput
   * @returns StudentResult
   */

  async adminGetStudentResult(
    adminGetStudentResultInput: AdminGetStudentResultInput,
  ): Promise<StudentResult | null> {
    const query = await this.studentResultRepository
      .createQueryBuilder('student_results')
      .leftJoinAndSelect('student_results.student', 'student')
      .leftJoinAndSelect('student.user', 'user')
      .leftJoinAndSelect('student.course', 'course')
      .leftJoinAndSelect('student_results.semester', 'semester')
      .where('student.id=:studentId', {
        studentId: adminGetStudentResultInput.studentId,
      })
      .andWhere('student_results.id=:studentRId', {
        studentRId: adminGetStudentResultInput.studentResultId,
      });
    const result = await query.getOne();
    console.log(result);

    return result;
  }

  /**
   * @description Admin will list the all student results by pagination or search
   * @param adminListStudentResultInput
   * @returns StudentResult
   */

  async adminListStudentResult(
    adminListStudentResultInput: AdminListStudentResultInput,
  ): Promise<[StudentResult[], number]> {
    const query = await this.studentResultRepository
      .createQueryBuilder('student_results')
      .leftJoinAndSelect('student_results.student', 'student')
      .leftJoinAndSelect('student.user', 'user')
      .leftJoinAndSelect('student.course', 'course')
      .leftJoinAndSelect('student_results.semester', 'semester');

    if (adminListStudentResultInput?.search) {
      query.andWhere('LOWER(user.name) LIKE :search', {
        search: `%${adminListStudentResultInput.search.toLowerCase()}%`,
      });
    }
    if (adminListStudentResultInput.pagination) {
      query
        .take(adminListStudentResultInput.take)
        .skip(adminListStudentResultInput.skip);
    }

    const result = await query.getManyAndCount();

    return result;
  }

  /**
   * @description Admin will update exiting Student result
   * @param adminUpdateStudentResultInput
   */

  async adminUpdateStudentResult(
    adminUpdateStudentResultInput: AdminUpdateStudentResultInput,
  ): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingStudentResults = await queryRunner.manager.findOne(
        StudentResult,
        {
          where: { id: adminUpdateStudentResultInput.studentResultId },
          relations: { course: true, semester: true, student: true },
        },
      );
      if (!existingStudentResults)
        throw new NotFoundException(
          this.i18n.t('student-result.STUDENT_RESULT_NOT_FOUND'),
        );

      const course = await queryRunner.manager.findOne(Course, {
        where: { id: adminUpdateStudentResultInput.course_id },
      });

      if (!course) {
        throw new NotFoundException(this.i18n.t('course.COURSE_NOT_FOUND'));
      }

      const semester = await queryRunner.manager.findOne(Semester, {
        where: { id: adminUpdateStudentResultInput.semester_id },
        relations: {
          course: true,
        },
      });

      if (!semester) {
        throw new NotFoundException(this.i18n.t('semester.SEMESTER_NOT_FOUND'));
      }

      // Validate semester belongs to selected course
      if (semester.course.id !== course.id) {
        throw new BadRequestException(
          this.i18n.t('semester.SEMESTER_NOT_LINKED'),
        );
      }
      // check student existing for creating result
      const existingStudent = await queryRunner.manager.findOne(Student, {
        where: { id: adminUpdateStudentResultInput.student_id },
        relations: { course: true },
      });

      if (!existingStudent) {
        throw new BadRequestException(this.i18n.t('student.STUDENT_NOT_FOUND'));
      }
      // Student should be valid course ID
      if (existingStudent.course.id !== course.id) {
        throw new BadRequestException(
          this.i18n.t('student.STUDENT_NOT_LINKED_COURSE'),
        );
      }

      existingStudentResults.marks = adminUpdateStudentResultInput.marks;
      existingStudentResults.grade_points =
        adminUpdateStudentResultInput.grade_points;
      existingStudentResults.result = adminUpdateStudentResultInput.result;
      existingStudentResults.student = existingStudent;
      existingStudentResults.course = course;
      existingStudentResults.semester = semester;

      await queryRunner.manager.save(StudentResult, existingStudentResults);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error) {
        throw new NotFoundException(error);
      }
      throw new NotFoundException(this.i18n.t('common.SOMETHING_WENT_WRONG'));
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * @description Admin can delete the student result linked with user
   * @param adminDeleteStudentInput
   */
  async adminDeleteStudentResult(
    adminDeleteStudentResultInput: AdminDeleteStudentResultInput,
  ) {
    const studentResult = await this.studentResultRepository.findOne({
      where: { id: adminDeleteStudentResultInput.studentResultId },
    });
    if (!studentResult)
      throw new NotFoundException(
        this.i18n.t('student-result.STUDENT_RESULT_NOT_FOUND'),
      );

    await this.studentResultRepository.softDelete(
      adminDeleteStudentResultInput.studentResultId,
    );
  }
}
