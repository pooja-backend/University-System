import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { I18nService } from 'nestjs-i18n';
import { GetProfileEntity } from './entities/get-profile.entity';
import { User } from './database/user.entity';
import { GetProfileResponse } from './response/get-profile.response';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly i18n: I18nService,
  ) {}
  /**
   * @description looged In User Profile
   * @param user
   * @returns
   */
  async getProfile(user: User): Promise<GetProfileEntity> {
    const profileUser = await this.userRepository.getProfile(user);
    if (!profileUser) {
      throw new NotFoundException(this.i18n.t('user.USER_NOT_FOUND'));
    }
    return GetProfileResponse.decode({ profile: profileUser });
  }
}
