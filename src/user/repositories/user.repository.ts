import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  /**
   * @description looged In User Profile
   * @param user
   * @returns
   */
  async getProfile(user: User): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.gender',
        'user.name',
        'role.id',
        'role.name',
        'status.id',
        'status.name',
      ])
      .leftJoin('user.role', 'role')
      .leftJoin('user.status', 'status')
      .where('user.id=:userId', { userId: user.id })
      .getOne();
  }
}
