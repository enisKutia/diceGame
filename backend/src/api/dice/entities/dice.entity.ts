import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DiceFace } from './dice-faces.entity';

@Entity('dices')
export class Dice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  faces: number;

  @Column('text')
  shape: string;

  @OneToMany((type) => DiceFace, (diceFace) => diceFace.dice)
  diceFaces: DiceFace[];
}
