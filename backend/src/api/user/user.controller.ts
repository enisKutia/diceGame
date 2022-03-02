import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { LoggedUser } from '../../common/decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(new AuthGuard())
@UsePipes(new ValidationPipe())
@ApiBearerAuth()
@ApiTags('Users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  async getProfile(@LoggedUser() currentUser) {
    return await this.userService.profile(currentUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put()
  update(@LoggedUser() currentUser, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(currentUser.id, updateUserDto);
  }

  @Delete()
  remove(@LoggedUser() currentUser) {
    return this.userService.remove(currentUser.id);
  }
}
