import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';
import {
  Exists,
  IsUnique,
  SameAs,
} from '../../../common/decorators/validation.decorator';

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty()
  first_name: string;

  @IsOptional()
  @ApiProperty()
  last_name: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  @IsUnique(
    'User',
    'users',
    {},
    {
      message: 'That email is taken',
    },
  )
  email: string;

  @IsOptional()
  @Length(6)
  @ApiProperty()
  password: string;

  @IsOptional()
  @ApiProperty()
  phone: string;
}
