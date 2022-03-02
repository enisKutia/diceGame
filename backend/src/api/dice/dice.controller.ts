import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/common/decorators/user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { DiceService } from './dice.service';
import { CreateDiceDto } from './dto/dice.dto';
// import { UpdateDieDto } from './dto/update-die.dto';

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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDieDto: UpdateDieDto) {
  //   return this.diceService.update(+id, updateDieDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diceService.remove(+id);
  }
}
