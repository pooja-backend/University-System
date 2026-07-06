import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Course } from 'src/course/database/course.entity';
import { Role } from 'src/role/database/role.entity';
import { Semester } from 'src/semester/database/semester.entity';
import { AdminDashboardService } from './admin/admin.service';
import { AdminDashboardResolver } from './admin/admin.resolver';
import { AdminDashboardRepository } from './repositories/admin/admin.repository';
import { User } from 'src/user/database/user.entity';
import { Student } from 'src/student/database/student.entity';
import { Subject } from 'src/subject/database/subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Semester, Subject, Role, User, Student]),
  ],
  providers: [
    AdminDashboardResolver,
    AdminDashboardService,
    AdminDashboardRepository,
  ],
})
export class DashbaordModule {}
