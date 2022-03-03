import { HttpException, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiceService } from '../dice/dice.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateHistoryDto, CreateMatchDto } from './dto/history.dto';
import { History } from './entities/history.entity';
import { Match } from './entities/match.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    private readonly diceService: DiceService,
    private readonly userService: UserService,
  ) {}

  async create(userId: string, createHistoryDto: CreateHistoryDto) {
    if (!createHistoryDto.diceId && !createHistoryDto.dice) {
      throw new HttpException(
        'You should provide a dice from database or one you created',
        422,
      );
    }
    const dice = createHistoryDto.diceId
      ? await this.diceService.findOne(createHistoryDto.diceId)
      : createHistoryDto.dice;

    let winning = false;

    const random = Math.floor(Math.random() * dice.diceFaces.length);

    const result: any = dice.diceFaces[random];
    let allNumbers = true;

    dice.diceFaces.forEach((element) => {
      if (!element.value.match(/^[0-9]+$/)) allNumbers = false;
    });

    if (!allNumbers) {
      winning = result.winning;
    }

    if (allNumbers) {
      const maxValue = Math.max(
        ...dice.diceFaces.map((o) => parseInt(o.value)),
        0,
      );

      winning = maxValue === parseInt(result.value) ? true : false;
    }

    let insertingObj = createHistoryDto.diceId
      ? {
          diceId: createHistoryDto.diceId,
          winning: winning as boolean,
          userId,
          result: result.value,
        }
      : { winning, userId, result: result.value };

    let history = this.historyRepository.create(insertingObj);

    history == (await this.historyRepository.save(history));
    console.log({ history });

    return await this.findOne(history.id);
  }

  async findAll(query) {
    let results = this.historyRepository
      .createQueryBuilder('history')
      .leftJoinAndSelect('history.user', 'user')
      .leftJoinAndSelect('history.dice', 'dice');

    if (query.winning) {
      results = results.where('history.winning = :winning', {
        winning: query.winning,
      });
    }

    return await results.getManyAndCount();
  }

  async findOne(id: string) {
    const history = await this.historyRepository
      .createQueryBuilder('history')
      .leftJoinAndSelect('history.dice', 'dice')
      .where('history.id = :id', { id })
      .getOne();

    if (!history) {
      throw new HttpException('This history does not exists', 404);
    }

    return history;
  }

  async getMyRolls(id: string) {
    const history = await this.historyRepository
      .createQueryBuilder('history')
      .leftJoinAndSelect('history.dice', 'dice')
      .leftJoinAndSelect('history.user', 'user')
      .leftJoinAndSelect('history.match', 'match')
      .leftJoinAndSelect('match.history', 'history_match')
      .where('user.id = :id', { id })
      .getManyAndCount();

    if (!history) {
      throw new HttpException('This history does not exists', 404);
    }

    return history;
  }

  async createMatch(userId: string, createMatchDto: CreateMatchDto) {
    await this.userService.findOne(createMatchDto.user_invited_id);
    const dice = await this.diceService.findOne(createMatchDto.diceId);

    let match = this.matchRepository.create({
      user_invited_id: createMatchDto.user_invited_id,
      userId,
    });
    match = await this.matchRepository.save(match);

    const random = Math.floor(Math.random() * dice.diceFaces.length);

    const result: any = dice.diceFaces[random];

    let history = this.historyRepository.create({
      userId,
      matchId: match.id,
      diceId: dice.id,
      result: result.value,
      winning: false,
    });

    history = await this.historyRepository.save(history);

    return await this.getMatchById(match.id);
  }

  async getMatchById(id: string) {
    const match = await this.matchRepository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.history', 'history')
      .leftJoinAndSelect('match.user', 'user')
      .leftJoinAndSelect('match.inivtedUser', 'inivtedUser')
      .where('match.id = :id', { id })
      .getOne();

    if (!match) {
      throw new HttpException('Match not found', 404);
    }

    return match;
  }

  async getMyMatches(id: string) {
    const match = await this.matchRepository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.history', 'history')
      .leftJoinAndSelect('match.user', 'user')
      .leftJoinAndSelect('match.inivtedUser', 'inivtedUser')
      .where('match.userId = :id', { id })
      .orWhere('match.user_invited_id = :id', { id })
      .getManyAndCount();

    return match;
  }

  async playAgainst(userId: string, id: string) {
    const match = await this.getMatchById(id);

    if (match.user_invited_id !== userId || match.userId == userId) {
      throw new HttpException('You cannot roll in this match!', 422);
    }

    if (match.history.length === 2) {
      throw new HttpException('You already have played against this', 422);
    }

    const dice = await this.diceService.findOne(match.history[0].diceId);

    let otherOponentWinning = false;
    let winning = false;
    const random = Math.floor(Math.random() * dice.diceFaces.length);

    const result: any = dice.diceFaces[random];

    let allNumbers = true;

    dice.diceFaces.forEach((element) => {
      if (!element.value.match(/^[0-9]+$/)) allNumbers = false;
    });

    if (!allNumbers) {
      winning = result.winning;
      const element = dice.diceFaces.find(
        (el) => el.value == match.history[0].result,
      );

      otherOponentWinning = element.winning;
    }

    if (allNumbers) {
      if (parseInt(result.value) > parseInt(match.history[0].result)) {
        winning = true;
      }
      if (parseInt(result.value) < parseInt(match.history[0].result)) {
        otherOponentWinning = true;
      }
    }

    let history = this.historyRepository.create({
      userId,
      matchId: match.id,
      diceId: dice.id,
      result: result.value,
      winning,
    });

    history = await this.historyRepository.save(history);

    await this.historyRepository.update(match.history[0].id, {
      winning: otherOponentWinning,
    });

    return await this.getMatchById(id);
  }
}
