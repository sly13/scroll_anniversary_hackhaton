import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlayerScoreModule } from './modules/player-score/player-score.module';

@Module({
  imports: [ConfigModule.forRoot(), PlayerScoreModule],
})
export class AppModule {}
