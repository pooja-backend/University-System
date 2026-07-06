import { plainToInstance, Type } from 'class-transformer';
import { CourseType } from 'src/course/enums/course.enum';
import { Gender } from 'src/user/enums/gender.enum';
import { ResultEnum } from 'src/student/enum/result.enum';

export class GetStudentResultSemesterInfoResponse {
  id: number;
}
export class GetStudentResultCourseInfoResponse {
  id: number;
  course_name: string;
  course_type: CourseType;
  // @Type(() => GetStudentResultSemesterInfoResponse)
  // semesters: GetStudentResultSemesterInfoResponse[];
}
export class GetsUserResultInfoResultResponse {
  id: number;
  name: string;
  email: string;
  gender: Gender;
}
export class GetsStudentResultResponse {
  id: number;
  roll_number: string;
  father_name: string;
  mother_name: string;
  dob: string;
  mobile: string;
  city: string;
  state: string;
  address: string;
  @Type(() => GetsUserResultInfoResultResponse)
  user: GetsUserResultInfoResultResponse;
}
export class GetsStudentResultInfoResponse {
  grade_points: number;
  marks: number;
  result: ResultEnum;
  @Type(() => GetsStudentResultResponse)
  student: GetsStudentResultResponse;
  @Type(() => GetStudentResultCourseInfoResponse)
  course: GetStudentResultCourseInfoResponse;
}
export class GetStudentResultsResponse {
  @Type(() => GetsStudentResultInfoResponse)
  studentResult: GetsStudentResultInfoResponse;

  static decode(input: any): GetStudentResultsResponse {
    return plainToInstance(this, input);
  }
}
