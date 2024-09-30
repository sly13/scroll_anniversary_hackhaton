import { IsString, IsNumber } from 'class-validator';

export class PlayerScoreDto {
  @IsString()
  address: string;

  @IsNumber()
  points: number;

  constructor(address: string, points: number) {
    this.address = address;
    this.points = points;
  }
}
