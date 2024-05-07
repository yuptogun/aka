import { Test, TestingModule } from '@nestjs/testing';
import { ShortlinksController } from './shortlinks.controller';
import { ShortlinksService } from './shortlinks.service';

describe('ShortlinksController', () => {
  let controller: ShortlinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortlinksController],
      providers: [ShortlinksService],
    }).compile();

    controller = module.get<ShortlinksController>(ShortlinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
