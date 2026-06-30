import { Module } from '@nestjs/common';
import { StudentResultService } from './student-result.service';
import { StudentResultResolver } from './student-result.resolver';

@Module({
  providers: [StudentResultResolver, StudentResultService],
})
export class StudentResultModule {}
