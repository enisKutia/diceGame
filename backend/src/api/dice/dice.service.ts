import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateDiceDto } from './dto/dice.dto';
// import { UpdateDieDto } from './dto/update-die.dto';
import { DiceFace } from './entities/dice-faces.entity';
import { Dice } from './entities/dice.entity';

@Injectable()
export class DiceService {
  constructor(
    @InjectRepository(Dice)
    private diceRepository: Repository<Dice>,
    @InjectRepository(DiceFace)
    private diceFaceRepository: Repository<DiceFace>,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  async create(user: User, createDiceDto: CreateDiceDto) {
    const userRole = await this.roleService.findOne(user.roleId);

    if (userRole.slug !== 'moderator') {
      throw new HttpException('You cannot create dice', 422);
    }

    if (createDiceDto.diceFaces.length !== createDiceDto.faces) {
      throw new HttpException(
        'Number of faces specified should be the same as specified',
        422,
      );
    }

    return 'This action adds a new die';
  }

  async findAll() {
    return await this.diceRepository
      .createQueryBuilder('dice')
      .leftJoinAndSelect('dice.diceFaces', 'faces')
      .getManyAndCount();
  }

  async findOne(id: string) {
    const dice = await this.diceRepository
      .createQueryBuilder('dice')
      .leftJoinAndSelect('dice.diceFaces', 'faces')
      .where('dice.id = :id', { id })
      .getOne();

    if (!dice) {
      throw new HttpException('This dice does not exists!', 422);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} die`;
  }
}
