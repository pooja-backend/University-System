import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CourseType } from 'src/course/enums/course.enum';
import { ResultEnum } from 'src/student/enum/result.enum';
import { Gender } from 'src/user/enums/gender.enum';

@ObjectType()
export class GetStudentsResultCourseDetailEntity {
  @Field(() => Int, { description: 'Id of course' })
  id: number;

  @Field(() => String, { description: 'Name of course' })
  course_name: string;

  @Field(() => CourseType, { description: 'Course Type UG/PG' })
  course_type: CourseType;
}

@ObjectType()
export class GetStudentsResultSemesterDetailEntity {
  @Field(() => Int, { description: 'Id of Semester' })
  id: number;
}
@ObjectType()
export class GetUsersResultInfoEntity {
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
export class GetStudentsResultInfoEntity {
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

  @Field(() => GetUsersResultInfoEntity, {
    description: 'User info',
    nullable: true,
  })
  user: GetUsersResultInfoEntity;

  @Field(() => GetStudentsResultCourseDetailEntity, {
    description: 'Course assigned to student',
    nullable: true,
  })
  course: GetStudentsResultCourseDetailEntity;
}
@ObjectType()
export class GetStudentsResultEntity {
  @Field(() => Int, { description: 'Grade point of student' })
  grade_points: number;

  @Field(() => Int, { description: 'marks of student' })
  marks: number;

  @Field(() => ResultEnum, { description: 'Result status' })
  result: ResultEnum;

  @Field(() => GetStudentsResultInfoEntity, {
    nullable: true,
    description: 'Get student data',
  })
  student: GetStudentsResultInfoEntity;
  @Field(() => GetStudentsResultSemesterDetailEntity, {
    description: 'Semester of course',
    nullable: true,
  })
  semester: GetStudentsResultSemesterDetailEntity;
}
@ObjectType()
export class AdminListStudentResultEntity {
  @Field(() => [GetStudentsResultEntity], {
    description: 'Admin list the student result detail',
    nullable: true,
  })
  studentResults: GetStudentsResultEntity[];
  @Field(() => Int, { description: 'Count result' })
  count: number;
}
