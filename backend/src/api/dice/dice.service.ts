import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import {
  CreateDiceDto,
  CreateDiceFaceDto,
  UpdateDiceDto,
  UpdateDiceFaceDto,
} from './dto/dice.dto';
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

    if (createDiceDto.diceFaces.length !== createDiceDto.faces) {
      throw new HttpException(
        'Number of faces specified should be the same as specified',
        422,
      );
    }

    const allNumbers = createDiceDto.diceFaces.every((element: any) =>
      element.value.match(/^[0-9]+$/),
    );

    if (!allNumbers) {
      let countWinnning = 0;
      createDiceDto.diceFaces.forEach((element: any) => {
        if (element.winning == true) {
          countWinnning++;
        }
      });

      if (countWinnning !== 1) {
        throw new HttpException('There should be 1 winning face', 422);
      }
    }

    if (userRole.slug !== 'moderator') {
      return createDiceDto;
    }
    let dice = this.diceRepository.create({
      faces: createDiceDto.faces,
      shape: createDiceDto.shape,
    });

    dice = await this.diceRepository.save(dice);

    const diceFacesToInsert = createDiceDto.diceFaces.map((el) => {
      return {
        ...el,
        diceId: dice.id,
      };
    });

    let diceFaces = this.diceFaceRepository.create(diceFacesToInsert);
    await this.diceFaceRepository.save(diceFaces);

    return await this.findOne(dice.id);
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

    return dice;
  }

  async update(id: string, updateDiceDto: UpdateDiceDto) {
    await this.findOne(id);
    await this.diceRepository.update(id, updateDiceDto);

    return await this.findOne(id);
  }

  async updateDiceFace(id: string, updateDiceFaceDto: UpdateDiceFaceDto) {
    const diceFace = await this.findDiceFace(id);

    if (updateDiceFaceDto.color) {
      await this.diceFaceRepository.update(id, {
        color: updateDiceFaceDto.color,
      });
    }

    return await this.findDiceFace(id);
  }

  async findDiceFace(id: string) {
    const diceFace = await this.diceFaceRepository.findOne(id);

    if (!diceFace) {
      throw new HttpException('This dice face does not exists!', 422);
    }

    return diceFace;
  }

  async remove(id: string) {
    const dice = await this.findOne(id);
    await this.diceRepository.remove(dice);

    return dice;
  }
}
