import { UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/auth/guards/at.guard';
import PermissionGuard from 'src/auth/guards/permission.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminStudentResultService } from './admin.service';
import { BooleanMessage } from 'src/user/entities/boolean-message.entity';
import { AdminCreateStudentResultInput } from '../dto/admin/admin-create-student-result.input';
import { StudentResult } from '../entities/student-result.entity';
import { AdminGetStudentResultEntity } from '../entities/admin/admin-get-student-result.entity';
import { AdminGetStudentResultInput } from '../dto/admin-get-student-result.input';
import { AdminListStudentResultInput } from '../dto/admin-list-student-result.input';
import { AdminListStudentResultEntity } from '../entities/admin/admin-list-student-result.entity';
import { AdminDeleteStudentResultInput } from '../dto/admin/admin-delete-student-result.input';
import { AdminUpdateStudentResultInput } from '../dto/admin/admin-update-student-result.input';

@UseGuards(AtGuard, PermissionGuard())
@Resolver(() => StudentResult)
export class AdminStudentResultResolver {
  constructor(
    private readonly adminStudentResultService: AdminStudentResultService,
  ) {}

  // 1.AdminCreateStudentResult
  @Mutation(() => BooleanMessage, {
    name: 'adminCreateStudentResult',
    description: 'Create student result by admin',
  })
  async adminCreateStudent(
    @Args('admin_create_student_result_input')
    adminCreateStudentResultInput: AdminCreateStudentResultInput,
  ) {
    return this.adminStudentResultService.adminCreateStudentResult(
      adminCreateStudentResultInput,
    );
  }

  //   // 2.AdminGetStudentResult
  @Query(() => AdminGetStudentResultEntity, {
    name: 'adminGetStudentResult',
    description: ' admin  get the student result detail.',
  })
  async adminGetStudentResult(
    @Args('admin_get_student_result_input')
    adminGetStudentResultInput: AdminGetStudentResultInput,
  ): Promise<AdminGetStudentResultEntity> {
    return this.adminStudentResultService.adminGetStudentResult(
      adminGetStudentResultInput,
    );
  }

  //   // 3.AdminListStudentResult
  @Query(() => AdminListStudentResultEntity, {
    name: 'adminListStudentResult',
    description: ' admin  list the student result detail.',
  })
  async adminListStudentResult(
    @Args('admin_list_student_result_input')
    adminListStudentResultInput: AdminListStudentResultInput,
  ): Promise<AdminListStudentResultEntity> {
    return this.adminStudentResultService.adminListStudentResult(
      adminListStudentResultInput,
    );
  }

  //   // 4.AdminUpdateStudentResult
  @Mutation(() => BooleanMessage, {
    name: 'adminUpdateStudentResult',
    description: 'update student result by admin',
  })
  async adminUpdateStudent(
    @Args('admin_update_student_result_input')
    adminUpdateStudentResultInput: AdminUpdateStudentResultInput,
  ) {
    return this.adminStudentResultService.adminUpdateStudentResult(
      adminUpdateStudentResultInput,
    );
  }

  //   // 5.AdminDeleteStudentResult
  @Mutation(() => BooleanMessage, {
    name: 'adminDeleteStudentResult',
    description: 'Delete student result by admin',
  })
  async adminDeleteStudent(
    @Args('admin_delete_student_result_input')
    adminDeleteStudentResultInput: AdminDeleteStudentResultInput,
  ) {
    return this.adminStudentResultService.adminDeleteStudentResult(
      adminDeleteStudentResultInput,
    );
  }
}
