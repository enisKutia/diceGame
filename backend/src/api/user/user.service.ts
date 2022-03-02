import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './auth/dto/register-user.dto';
import { UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .getManyAndCount();
  }

  async profile(data: User): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where({ id: data.id })
      .getOne();
  }

  async findOne(id: string) {
    return await this.getRequestedUserOrFail(id);
  }

  //TODO: Email update and also validation
  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.getRequestedUserOrFail(id);
    if (updateUserDto.email) {
      const user = await this.findUserByEmail(updateUserDto.email);

      if (user.id !== id) {
        throw new HttpException('This email is already taken', 422);
      }
    }

    await this.userRepository.update(id, updateUserDto);

    return await this.userRepository.findOne(id);
  }

  async remove(id: string) {
    await this.getRequestedUserOrFail(id);
    await this.userRepository.delete(id);
    return { message: 'User was deleted successfully!' };
  }

  async getRequestedUserOrFail(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new HttpException('User does not exists!', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async checkIfEmailExists(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      throw new HttpException('User already exists!', HttpStatus.FOUND);
    }
    return user;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
