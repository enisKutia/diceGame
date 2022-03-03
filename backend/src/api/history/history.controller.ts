import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto, CreateMatchDto } from './dto/history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/common/decorators/user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(new AuthGuard())
@UsePipes(new ValidationPipe())
@ApiBearerAuth()
@ApiTags('History')
@Controller('api/history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  create(@LoggedUser() user, @Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(user.id, createHistoryDto);
  }

  @Roles('moderator')
  @Get()
  findAll(@Query() query) {
    return this.historyService.findAll(query);
  }

  @Get('/my-rolls')
  getMyRolls(@LoggedUser() user) {
    return this.historyService.getMyRolls(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(id);
  }

  @Post('/match')
  createMatch(@LoggedUser() user, @Body() createMatchDto: CreateMatchDto) {
    return this.historyService.createMatch(user.id, createMatchDto);
  }

  @Get('/match/my-matches')
  getMatches(@LoggedUser() user) {
    return this.historyService.getMyMatches(user.id);
  }

  @Post('/match/against/:id')
  playAgainst(@LoggedUser() user, @Param('id') id: string) {
    return this.historyService.playAgainst(user.id, id);
  }
}
