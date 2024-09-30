import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlayerScore {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  address!: string;

  @Column()
  points!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
