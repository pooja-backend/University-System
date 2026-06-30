import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { AdminCreateStudentResultInput } from './admin-create-student-result.input';

@InputType()
export class AdminUpdateStudentResultInput extends AdminCreateStudentResultInput {
  @Field(() => Int, { description: 'Student Id' })
  @IsNumber()
  @IsNotEmpty()
  studentResultId: number;
}
