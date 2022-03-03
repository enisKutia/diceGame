import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateDiceDto } from 'src/api/dice/dto/dice.dto';

export class CreateHistoryDto {
  @IsOptional()
  @ApiProperty()
  diceId?: string;

  @IsOptional()
  @ApiProperty()
  dice?: CreateDiceDto;
}

export class CreateMatchDto {
  @IsNotEmpty()
  @ApiProperty()
  diceId?: string;

  @IsNotEmpty()
  @ApiProperty()
  user_invited_id?: string;
}
