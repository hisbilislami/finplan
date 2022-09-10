import { Test, TestingModule } from '@nestjs/testing';
import { ValidId } from './valid-id';

describe('ValidId', () => {
  let provider: ValidId;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidId],
    }).compile();

    provider = module.get<ValidId>(ValidId);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
