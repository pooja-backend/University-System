import { plainToInstance, Type } from 'class-transformer';
import { CourseType } from 'src/course/enums/course.enum';
import { ResultEnum } from 'src/student/enum/result.enum';
import { Gender } from 'src/user/enums/gender.enum';

export class GetStudentResultCourseDetailResponse {
  id: number;
  course_name: string;
  course_type: CourseType;
}
export class GetStudentResultSemesterDetailResponse {
  id: number;
}
export class GetUserResultInfoResponse {
  id: number;
  name: string;
  email: string;
  gender: Gender;
  created_at: Date;
}
export class GetStudentResultInfoResponse {
  id: number;
  roll_number: string;
  father_name: string;
  mother_name: string;
  dob: string;
  mobile: string;
  city: string;
  state: string;
  address: string;
  @Type(() => GetUserResultInfoResponse)
  user: GetUserResultInfoResponse;
  @Type(() => GetStudentResultCourseDetailResponse)
  course: GetStudentResultCourseDetailResponse;
}
export class GetStudentResultResponse {
  grade_points: number;
  marks: number;
  result: ResultEnum;
  @Type(() => GetStudentResultInfoResponse)
  student: GetStudentResultInfoResponse;
  @Type(() => GetStudentResultSemesterDetailResponse)
  semester: GetStudentResultSemesterDetailResponse;
}
export class AdminGetStudentResultResponse {
  @Type(() => GetStudentResultResponse)
  studentResults: GetStudentResultResponse;

  static decode(input: any): AdminGetStudentResultResponse {
    return plainToInstance(this, input);
  }
}
