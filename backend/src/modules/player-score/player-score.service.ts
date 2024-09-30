import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PlayerScoreDto } from './dto/player-score.dto';

@Injectable()
export class PlayerScoreService {
  private prisma = new PrismaClient();

  async savePoints(playerScoreDto: PlayerScoreDto): Promise<string> {
    const { address, points } = playerScoreDto;

    const existingScore = await this.prisma.playerScore.findUnique({
      where: { address },
    });

    if (existingScore) {
      if (existingScore.points < points) {
        await this.prisma.playerScore.update({
          where: { address },
          data: { points },
        });
        return 'Points updated successfully';
      } else {
        return 'Current points are less than or equal to the incoming points. No update made.';
      }
    } else {
      await this.prisma.playerScore.create({
        data: { address, points },
      });
      return 'Points saved successfully';
    }
  }

  async leaderboard(): Promise<{ address: string; points: number }[]> {
    const scores = await this.prisma.playerScore.findMany({
      orderBy: {
        points: 'desc',
      },
    });

    return scores.map((score) => ({
      address: score.address,
      points: score.points,
    }));
  }
}
