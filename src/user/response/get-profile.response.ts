import { plainToInstance, Type } from 'class-transformer';
import { Gender } from '../enums/gender.enum';
import { GetRoleResponse, GetStatusResponse } from './register.response';

export class ProfileResponse {
  id: number;
  name: string;
  email: string;
  gender: Gender;
  @Type(() => GetStatusResponse)
  status: GetStatusResponse;
  @Type(() => GetRoleResponse)
  role: GetRoleResponse;
}
export class GetProfileResponse {
  @Type(() => ProfileResponse)
  profile: ProfileResponse;

  static decode(input: any): GetProfileResponse {
    return plainToInstance(this, input);
  }
}
