import { Test, TestingModule } from '@nestjs/testing';
import { PlayerScoreController } from './player-score.controller';

describe('ScoreController', () => {
  let controller: PlayerScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerScoreController],
    }).compile();

    controller = module.get<PlayerScoreController>(PlayerScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
