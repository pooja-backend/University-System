import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CourseType } from 'src/course/enums/course.enum';
import { ResultEnum } from 'src/student/enum/result.enum';
import { Gender } from 'src/user/enums/gender.enum';

@ObjectType()
export class GetStudentResultCourseDetailEntity {
  @Field(() => Int, { description: 'Id of course' })
  id: number;

  @Field(() => String, { description: 'Name of course' })
  course_name: string;

  @Field(() => CourseType, { description: 'Course Type UG/PG' })
  course_type: CourseType;
}

@ObjectType()
export class GetStudentResultSemesterDetailEntity {
  @Field(() => Int, { description: 'Id of Semester' })
  id: number;
}
@ObjectType()
export class GetUserResultInfoEntity {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field({ nullable: true })
  gender: Gender;
}
@ObjectType()
export class GetStudentResultInfoEntity {
  @Field(() => Int, { description: 'Student Id' })
  id: number;

  @Field(() => String, { description: 'Roll no of user', nullable: true })
  roll_number: string;

  @Field(() => String, { description: 'Student father name' })
  father_name: string;

  @Field(() => String, { description: 'Student mother name' })
  mother_name: string;

  @Field(() => String, { description: 'Dob of student' })
  dob: string;

  @Field(() => String, { description: 'mobile of student' })
  mobile: string;

  @Field(() => String, { description: 'Student city name' })
  city: string;

  @Field(() => String, { description: 'Student state name' })
  state: string;

  @Field(() => String, { description: 'Student address name' })
  address: string;

  @Field(() => GetUserResultInfoEntity, {
    description: 'User info',
    nullable: true,
  })
  user: GetUserResultInfoEntity;

  @Field(() => GetStudentResultCourseDetailEntity, {
    description: 'Course assigned to student',
    nullable: true,
  })
  course: GetStudentResultCourseDetailEntity;
}
@ObjectType()
export class GetStudentResultEntity {
  @Field(() => Int, { description: 'Grade point of student' })
  grade_points: number;

  @Field(() => Int, { description: 'marks of student' })
  marks: number;

  @Field(() => ResultEnum, { description: 'Result status' })
  result: ResultEnum;

  @Field(() => GetStudentResultInfoEntity, {
    nullable: true,
    description: 'Get student data',
  })
  student: GetStudentResultInfoEntity;
  @Field(() => GetStudentResultSemesterDetailEntity, {
    description: 'Semester of course',
    nullable: true,
  })
  semester: GetStudentResultSemesterDetailEntity;
}
@ObjectType()
export class AdminGetStudentResultEntity {
  @Field(() => GetStudentResultEntity, {
    description: 'Admin get the student result detail',
    nullable: true,
  })
  studentResults: GetStudentResultEntity;
}
