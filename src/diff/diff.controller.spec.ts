import { Test, TestingModule } from '@nestjs/testing';
import { DiffController } from './diff.controller';
import { DiffService } from './diff.service';

describe('DiffController', () => {
  let controller: DiffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiffController],
      providers: [DiffService],
    }).compile();

    controller = module.get<DiffController>(DiffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
