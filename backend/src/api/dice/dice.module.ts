import { Module } from '@nestjs/common';
import { DiceService } from './dice.service';
import { DiceController } from './dice.controller';
import { Dice } from './entities/dice.entity';
import { DiceFace } from './entities/dice-faces.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { User } from '../user/entities/user.entity';
import { Role } from '../role/entities/role.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Dice, DiceFace, User, Role]),
  ],
  controllers: [DiceController],
  providers: [DiceService, UserService, RoleService],
})
export class DiceModule {}
