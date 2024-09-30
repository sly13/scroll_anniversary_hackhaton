import { Module } from '@nestjs/common';
import { PlayerScoreController } from './player-score.controller';
import { PlayerScoreService } from './player-score.service';

@Module({
  controllers: [PlayerScoreController],
  providers: [PlayerScoreService],
})
export class PlayerScoreModule {}
