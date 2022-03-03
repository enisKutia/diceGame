import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { Dice } from '../dice/entities/dice.entity';
import { DiceFace } from '../dice/entities/dice-faces.entity';
import { User } from '../user/entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { Match } from './entities/match.entity';
import { DiceService } from '../dice/dice.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Dice, DiceFace, User, Role, History, Match]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService, DiceService, UserService, RoleService],
})
export class HistoryModule {}
