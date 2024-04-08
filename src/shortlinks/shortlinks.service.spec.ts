import { Test, TestingModule } from '@nestjs/testing';
import { ShortlinksService } from './shortlinks.service';

describe('ShortlinksService', () => {
  let service: ShortlinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortlinksService],
    }).compile();

    service = module.get<ShortlinksService>(ShortlinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
