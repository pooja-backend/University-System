import { UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/auth/guards/at.guard';
import PermissionGuard from 'src/auth/guards/permission.guard';
import {  Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/database/user.entity';
import { StudentResultService } from './student-result.service';
import { StudentResult } from './database/student-result.entity';
import { GetStudentResultsEntity } from './entities/get-student-result.entity';

@UseGuards(AtGuard, PermissionGuard())
@Resolver(() => StudentResult)
export class StudentResultResolver {
  constructor(private readonly studentResultService: StudentResultService) {}

  // 1.GetStudentResult
  @Query(() => GetStudentResultsEntity, {
    name: 'getStudentResult',
    description: '   get the student result detail.',
  })
  async getStudentResult(
    @CurrentUser() user: User,
  ): Promise<GetStudentResultsEntity> {                                                                           
    return this.studentResultService.getStudentResult(user);
  }
}
