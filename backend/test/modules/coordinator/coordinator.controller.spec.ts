import { Test, TestingModule } from '@nestjs/testing';
import { CoordinatorController } from 'src/modules/coordinator/coordinator.controller';

describe('CoordinatorController', () => {
  let controller: CoordinatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoordinatorController],
    }).compile();

    controller = module.get<CoordinatorController>(CoordinatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
