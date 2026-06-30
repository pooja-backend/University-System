import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ResultEnum } from 'src/student/enum/result.enum';
import { Gender } from 'src/user/enums/gender.enum';
import { StatusEnum } from 'src/user/enums/status.enums';
import { UserRoles } from 'src/user/enums/user-role.enum';

@InputType()
export class AdminCreateStudentResultInput {
  @Field(() => Int, { description: 'Marks of Student' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  marks: number;

  @Field(() => Int, { description: 'Grade point of student' })
  @IsNumber()
  @IsPositive()
  grade_points: number;

  @Field(() => ResultEnum, { description: 'Result of student' })
  @IsEnum(ResultEnum)
  @IsNotEmpty()
  result: ResultEnum;

  @Field(() => Int, { description: 'student Id', nullable: true })
  @IsNumber()
  @IsOptional()
  student_id: number;

  @Field(() => Int, { description: 'Course Id (Assigned to user)' })
  @IsNumber()
  @IsNotEmpty()
  course_id: number;

  @Field(() => Int, { description: 'Semester Id' })
  @IsNumber()
  @IsNotEmpty()
  semester_id: number;
}
