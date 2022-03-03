import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoryDto } from './history.dto';

export class UpdateHistoryDto extends PartialType(CreateHistoryDto) {}
