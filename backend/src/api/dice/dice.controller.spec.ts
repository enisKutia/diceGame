import { Test, TestingModule } from '@nestjs/testing';
import { DiceController } from './dice.controller';
import { DiceService } from './dice.service';

describe('DiceController', () => {
  let controller: DiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiceController],
      providers: [DiceService],
    }).compile();

    controller = module.get<DiceController>(DiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
