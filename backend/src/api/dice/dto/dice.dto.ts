import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class CreateDiceDto {
  @IsNotEmpty()
  @ApiProperty()
  faces: number;

  @IsNotEmpty()
  @ApiProperty()
  shape: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDiceFaceDto)
  diceFaces: CreateDiceDto[];
}

export class CreateDiceFaceDto {
  @IsNotEmpty()
  @ApiProperty()
  color: string;

  @IsNotEmpty()
  @ApiProperty()
  value: string;

  @IsOptional()
  @ApiProperty()
  winning: boolean;
}

export class UpdateDiceDto {
  @IsOptional()
  @ApiProperty()
  shape: string;
}

export class UpdateDiceFaceDto {
  @IsOptional()
  @ApiProperty()
  color: string;
}
