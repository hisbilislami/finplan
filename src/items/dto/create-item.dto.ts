import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import {
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { AttachUser } from 'src/etc/globaldto/attach-user.dto';
import { isValidId } from 'src/etc/validator/valid-id';
import { UserDtoId } from 'src/user/dto/create-user.dto';
import { Item } from '../entities/item.entity';

export class ItemDto extends AttachUser {
  @ApiProperty()
  @IsOptional()
  @isValidId([Item], { message: 'Invalid item' })
  id: number;

  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ type: UserDtoId })
  @IsObject()
  @ValidateNested()
  user_id: UserDtoId;
}
export class CreateItemDto extends OmitType(ItemDto, ['id']) {}
export class ItemDtoId extends PickType(ItemDto, ['id']) {}
