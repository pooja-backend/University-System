import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CourseType } from 'src/course/enums/course.enum';
import { ResultEnum } from 'src/student/enum/result.enum';
import { Gender } from 'src/user/enums/gender.enum';

@ObjectType()
export class GetStudentResultSemesterInfoEntity {
  @Field(() => Int, { description: 'Id of Semsester' })
  id: number;
}
@ObjectType()
export class GetStudentResultCourseInfoEntity {
  @Field(() => Int, { description: 'Id of course' })
  id: number;

  @Field(() => String, { description: 'Name of course' })
  course_name: string;

  @Field(() => CourseType, { description: 'Course Type UG/PG' })
  course_type: CourseType;

  // @Field(() => [GetStudentResultSemesterInfoEntity], { nullable: true })
  // semesters: GetStudentResultSemesterInfoEntity[];
}

@ObjectType()
export class GetsUserResultInfoEntity {
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
export class GetsStudentResultInfoEntity {
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

  @Field(() => GetsUserResultInfoEntity, {
    description: 'User info',
    nullable: true,
  })
  user: GetsUserResultInfoEntity;
}
@ObjectType()
export class GetsStudentResultEntity {
  @Field(() => Int, { description: 'Grade point of student' })
  grade_points: number;

  @Field(() => Int, { description: 'marks of student' })
  marks: number;

  @Field(() => ResultEnum, { description: 'Result status' })
  result: ResultEnum;

  @Field(() => GetsStudentResultInfoEntity, {
    nullable: true,
    description: 'Get student data',
  })
  student: GetsStudentResultInfoEntity;

  @Field(() => GetStudentResultCourseInfoEntity, {
    description: 'Course assigned to student',
    nullable: true,
  })
  course: GetStudentResultCourseInfoEntity;
}
@ObjectType()
export class GetStudentResultsEntity {
  @Field(() => GetsStudentResultEntity, {
    description: ' student result detail',
    nullable: true,
  })
  studentResult: GetsStudentResultEntity;
}
