import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentResultService } from './student-result.service';
import { StudentResult } from './entities/student-result.entity';
import { CreateStudentResultInput } from './dto/admin-get-student-result.input';
import { UpdateStudentResultInput } from './dto/admin-list-student-result.input';

@Resolver(() => StudentResult)
export class StudentResultResolver {
  constructor(private readonly studentResultService: StudentResultService) {}

  @Mutation(() => StudentResult)
  createStudentResult(
    @Args('createStudentResultInput')
    createStudentResultInput: CreateStudentResultInput,
  ) {
    return this.studentResultService.create(createStudentResultInput);
  }

  @Query(() => [StudentResult], { name: 'studentResult' })
  findAll() {
    return this.studentResultService.findAll();
  }

  @Query(() => StudentResult, { name: 'studentResult' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.studentResultService.findOne(id);
  }

  @Mutation(() => StudentResult)
  updateStudentResult(
    @Args('updateStudentResultInput')
    updateStudentResultInput: UpdateStudentResultInput,
  ) {
    return this.studentResultService.update(
      updateStudentResultInput.id,
      updateStudentResultInput,
    );
  }

  @Mutation(() => StudentResult)
  removeStudentResult(@Args('id', { type: () => Int }) id: number) {
    return this.studentResultService.remove(id);
  }
}
