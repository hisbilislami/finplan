import { PartialType } from '@nestjs/mapped-types';
import { ItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(ItemDto) {}
