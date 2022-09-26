import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import {
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { AttachUser } from 'src/etc/globaldto/attach-user.dto';
import { isValidId } from 'src/etc/validator/valid-id';
import { PlanningDtoId } from 'src/planning/dto/create-planning.dto';
import { Transaction } from '../entities/transaction.entity';

export class TransactionDto extends AttachUser {
  @ApiProperty()
  @IsOptional()
  @isValidId([Transaction], { message: 'invalid transaction' })
  id: number;

  @ApiProperty({ type: PlanningDtoId, required: true })
  @IsObject()
  @ValidateNested()
  planning_id: PlanningDtoId;

  @ApiProperty({ required: true })
  @IsNumber()
  real_price: number;

  @ApiProperty({ required: true })
  @IsDate()
  date: Date;
}

export class CreateTransactionDto extends OmitType(TransactionDto, ['id']) {}
export class TransactionDtoId extends PickType(TransactionDto, ['id']) {}
