import { Test, TestingModule } from '@nestjs/testing';
import { StudentResultResolver } from './student-result.resolver';
import { StudentResultService } from './student-result.service';

describe('StudentResultResolver', () => {
  let resolver: StudentResultResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentResultResolver, StudentResultService],
    }).compile();

    resolver = module.get<StudentResultResolver>(StudentResultResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
