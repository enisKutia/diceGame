import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { History } from './history.entity';

@Entity('match')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  userId: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  user_invited_id: string;

  @OneToMany((type) => History, (history) => history.match)
  history: History[];

  @ManyToOne((type) => User, (user) => user.match, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne((type) => User, (user) => user.match, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_invited_id' })
  inivtedUser: User;
}
