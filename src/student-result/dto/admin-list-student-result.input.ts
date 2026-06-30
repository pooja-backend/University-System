import { CreateStudentResultInput } from './admin-get-student-result.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStudentResultInput extends PartialType(
  CreateStudentResultInput,
) {
  @Field(() => Int)
  id: number;
}
