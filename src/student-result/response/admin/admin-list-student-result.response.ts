import { plainToInstance, Type } from 'class-transformer';
import { CourseType } from 'src/course/enums/course.enum';
import { ResultEnum } from 'src/student/enum/result.enum';
import { Gender } from 'src/user/enums/gender.enum';

export class GetStudentsResultCourseDetailResponse {
  id: number;
  course_name: string;
  course_type: CourseType;
}
export class GetStudentsResultSemesterDetailResponse {
  id: number;
}
export class GetUsersResultInfoResponse {
  id: number;
  name: string;
  email: string;
  gender: Gender;
  created_at: Date;
}
export class GetStudentsResultInfoResponse {
  id: number;
  roll_number: string;
  father_name: string;
  mother_name: string;
  dob: string;
  mobile: string;
  city: string;
  state: string;
  address: string;
  @Type(() => GetUsersResultInfoResponse)
  user: GetUsersResultInfoResponse;
  @Type(() => GetStudentsResultCourseDetailResponse)
  course: GetStudentsResultCourseDetailResponse;
}
export class GetStudentsResultResponse {
  grade_points: number;
  marks: number;
  result: ResultEnum;
  @Type(() => GetStudentsResultInfoResponse)
  student: GetStudentsResultInfoResponse;
  @Type(() => GetStudentsResultSemesterDetailResponse)
  semester: GetStudentsResultSemesterDetailResponse;
}
export class AdminListStudentResultResponse {
  @Type(() => GetStudentsResultResponse)
  studentResults: GetStudentsResultResponse[];
  count: number;

  static decode(input: any): AdminListStudentResultResponse {
    return plainToInstance(this, input);
  }
}
