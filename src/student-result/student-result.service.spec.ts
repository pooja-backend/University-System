import { Test, TestingModule } from '@nestjs/testing';
import { StudentResultService } from './student-result.service';

describe('StudentResultService', () => {
  let service: StudentResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentResultService],
    }).compile();

    service = module.get<StudentResultService>(StudentResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
