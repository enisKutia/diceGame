import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { LoginUserDto, RegisterUserDto } from './dto/register-user.dto';
import { AuthServiceGeneral } from '../../../services/auth/AuthService';
import { HashService } from '../../../services/hash/HashService';
import { UserService } from '../user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly authService: AuthServiceGeneral,
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  public async register(data: RegisterUserDto) {
    await this.userService.checkIfEmailExists(data.email);

    let user = this.userRepository.create(data);
    user = await this.userRepository.save(user);

    return this.authService.sign(
      {
        userId: user.id,
      },
      {
        user: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
      },
    );
  }

  public async login(data: LoginUserDto) {
    const user = await this.userRepository.findOne({ email: data.email });

    if (!user) {
      throw new HttpException('User does not exists!', 404);
    }

    if (!(await this.hashService.compare(data.password, user.password))) {
      throw new HttpException(
        'Password does not match!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.authService.sign(
      { userId: user.id },
      {
        user: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
      },
    );
  }
}
