import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './database/user.entity';
import { GetProfileEntity } from './entities/get-profile.entity';
import { CurrentUser } from './user.decorator';
import { AtGuard } from 'src/auth/guards/at.guard';
import PermissionGuard from 'src/auth/guards/permission.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(AtGuard, PermissionGuard())
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => GetProfileEntity, {
    name: 'getProfile',
    description: 'User get profile page',
  })
  async getProfile(@CurrentUser() user: User) {
    return this.userService.getProfile(user);
  }
}
