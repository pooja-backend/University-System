import { Injectable } from '@nestjs/common';
import { CreateStudentResultInput } from './dto/admin-get-student-result.input';
import { UpdateStudentResultInput } from './dto/admin-list-student-result.input';

@Injectable()
export class StudentResultService {
  create(createStudentResultInput: CreateStudentResultInput) {
    return 'This action adds a new studentResult';
  }

  findAll() {
    return `This action returns all studentResult`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentResult`;
  }

  update(id: number, updateStudentResultInput: UpdateStudentResultInput) {
    return `This action updates a #${id} studentResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentResult`;
  }
}
