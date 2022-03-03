import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { Dice } from './dice.entity';

@Entity('dice-faces')
export class DiceFace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  diceId: string;

  @Column('text')
  color: string;

  @Column('text')
  value: string;

  @Column('text')
  winning: boolean;

  @ManyToOne((type) => Dice, (dice) => dice.diceFaces, {
    onDelete: 'CASCADE',
  })
  dice: Dice;

  @BeforeInsert()
  async setWinning() {
    this.winning = this.winning ? this.winning : false;
  }
}
