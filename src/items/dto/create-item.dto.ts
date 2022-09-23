import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { isValidId } from 'src/etc/validator/valid-id';
import { Item } from '../entities/item.entity';

export class ItemDto {
  @ApiProperty()
  @IsOptional()
  @isValidId([Item], { message: 'Invalid item' })
  id: number;

  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(255)
  name: string;
}
export class CreateItemDto extends OmitType(ItemDto, ['id']) {}
export class ItemDtoId extends PickType(ItemDto, ['id']) {}
