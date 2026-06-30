import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class AdminDeleteStudentResultInput {
  @Field(() => Int, { description: 'Id of student result ' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  studentResultId: number;
}
