import { Dice } from '../../dice/entities/dice.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Match } from './match.entity';

@Entity('history')
export class History {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  diceId: string;

  @Column('text')
  result: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  userId: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  matchId: string;

  @Column('text')
  winning: boolean;

  @ManyToOne((type) => Dice, (dice) => dice.history, {
    onDelete: 'CASCADE',
  })
  dice: Dice;

  @ManyToOne((type) => User, (user) => user.history, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne((type) => Match, (match) => match.history, {
    onDelete: 'CASCADE',
  })
  match: Match;
}
