import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/database/student.entity';
import { StudentResolver } from 'src/student/student.resolver';
import { StudentResult } from './database/student-result.entity';
import { Role } from 'src/role/database/role.entity';
import { Course } from 'src/course/database/course.entity';
import { Semester } from 'src/semester/database/semester.entity';
import { AdminStudentResultResolver } from './admin/admin.resolver';
import { AdminStudentResultService } from './admin/admin.service';
import { AdminStudentResultRepository } from './repositories/admin.repository';
import { StudentResultResolver } from './student-result.resolver';
import { StudentResultService } from './student-result.service';
import { StudentResultRepository } from './repositories/student-result.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, StudentResult, Role, Course, Semester]),
  ],
  providers: [
    AdminStudentResultResolver,
    AdminStudentResultService,
    AdminStudentResultRepository,
    StudentResultResolver,
    StudentResultService,
    StudentResultRepository,
  ],
})
export class StudentResultModule {}
