import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { Role } from 'src/role/database/role.entity';
import { Status } from 'src/status/database/status.entity';
import { UserResolver } from './user.resolver';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Status])],
  providers: [UserResolver,UserService,UserRepository],
})
export class UserModule {}
