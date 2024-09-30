import { Controller, Post, Body, Get } from '@nestjs/common';
import { PlayerScoreService } from './player-score.service';
import { PlayerScoreDto } from './dto/player-score.dto';

@Controller('api')
export class PlayerScoreController {
  constructor(private readonly playerScoreService: PlayerScoreService) {}

  @Post('save-points')
  async savePoints(@Body() playerScoreDto: PlayerScoreDto) {
    return this.playerScoreService.savePoints(playerScoreDto);
  }

  @Get('leaderboard')
  async leaderboard() {
    return this.playerScoreService.leaderboard();
  }
}
