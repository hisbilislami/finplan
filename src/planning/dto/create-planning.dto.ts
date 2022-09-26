import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import {
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AttachUser } from 'src/etc/globaldto/attach-user.dto';
import { isValidId } from 'src/etc/validator/valid-id';
import { ItemDtoId } from 'src/items/dto/create-item.dto';
import { Planning } from '../entities/planning.entity';

export class PlanningDto extends AttachUser {
  @ApiProperty()
  @IsOptional()
  @isValidId([Planning], { message: 'Invalid Planning' })
  id: number;

  @ApiProperty({ type: ItemDtoId })
  @ValidateNested()
  @IsObject()
  item_id: ItemDtoId;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  qty: number;

  @ApiProperty()
  @IsNumber()
  subtotal_estimated_price: number;

  @ApiProperty()
  @IsDate()
  periode: Date;

  @ApiProperty({ enum: ['Cash', 'Cashless'] })
  @IsString()
  payment_type: string;
}

export class CreatePlanningDto extends OmitType(PlanningDto, ['id']) {}
export class PlanningDtoId extends PickType(PlanningDto, ['id']) {}
