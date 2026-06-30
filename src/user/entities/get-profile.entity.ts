import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Gender } from '../enums/gender.enum';
import { StatusEntity } from './register-user.entity';
import { LoginRoleEntity } from './login-user.entity';

@ObjectType()
export class ProfileEntity {
  @Field(() => Int, { description: 'Id of user' })
  id: number;

  @Field(() => String, { description: 'User name' })
  name: string;

  @Field(() => String, { description: 'User email' })
  email: string;

  @Field(() => Gender, { description: 'Gender of user' })
  gender: Gender;

  @Field(() => StatusEntity, { description: 'Status of user' })
  status: StatusEntity;

  @Field(() => LoginRoleEntity, { description: 'Role of user' })
  role: LoginRoleEntity;
}
@ObjectType()
export class GetProfileEntity {
  @Field(() => ProfileEntity, {
    description: 'Profile detail of logged in user',
  })
  profile: ProfileEntity;
}
