import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HashService } from '../../../services/hash/HashService';
import { Exclude } from 'class-transformer';
import { Role } from '../../role/entities/role.entity';
import { History } from '../../history/entities/history.entity';
import { Match } from '../../history/entities/match.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  first_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  last_name: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column('text')
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  roleId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async setClientRole() {
    this.roleId = '9ce43c89-2fdc-46ba-8a3d-d7d7ef3f03d0';
  }

  @BeforeInsert()
  async setPassword() {
    if (this.password)
      this.password = await new HashService().make(this.password);
  }
  @ManyToOne((type) => Role, (role) => role.users, {
    onDelete: 'CASCADE',
  })
  role: Role;

  @OneToMany((type) => History, (history) => history.user)
  history: History[];

  @OneToMany((type) => Match, (match) => match.user)
  match: Match[];
}
