import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class AdminGetStudentResultInput {
  @Field(() => Int, { description: 'Id of student  id' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  studentId: number;

  @Field(() => Int, { description: 'Id of student result id' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  studentResultId: number;
}
