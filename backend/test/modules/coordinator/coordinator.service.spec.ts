import { Test, TestingModule } from '@nestjs/testing';
import { CoordinatorService } from 'src/modules/coordinator/coordinator.service';

describe('CoordinatorService', () => {
  let service: CoordinatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoordinatorService],
    }).compile();

    service = module.get<CoordinatorService>(CoordinatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
