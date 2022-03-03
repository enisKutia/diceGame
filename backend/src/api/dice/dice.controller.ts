import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  UsePipes,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { LoggedUser } from 'src/common/decorators/user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { DiceService } from './dice.service';
import {
  CreateDiceDto,
  UpdateDiceDto,
  UpdateDiceFaceDto,
} from './dto/dice.dto';

@UseGuards(new AuthGuard())
@UsePipes(new ValidationPipe())
@ApiBearerAuth()
@ApiTags('Dice')
@Controller('api/dice')
export class DiceController {
  constructor(private readonly diceService: DiceService) {}

  @Post()
  create(@LoggedUser() currentUser, @Body() createDiceDto: CreateDiceDto) {
    return this.diceService.create(currentUser, createDiceDto);
  }

  @Get()
  findAll() {
    return this.diceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diceService.findOne(id);
  }

  @Roles('moderator')
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDiceDto: UpdateDiceDto) {
    return this.diceService.update(id, updateDiceDto);
  }

  @Roles('moderator')
  @Put('/face/:id')
  updateFace(
    @Param('id') id: string,
    @Body() updateDiceFaceDto: UpdateDiceFaceDto,
  ) {
    return this.diceService.updateDiceFace(id, updateDiceFaceDto);
  }

  @Roles('moderator')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diceService.remove(id);
  }
}
