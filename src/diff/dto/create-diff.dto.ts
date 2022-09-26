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
import { Diff } from '../entities/diff.entity';

export class DiffDto extends AttachUser {
  @ApiProperty()
  @IsOptional()
  @isValidId([Diff], { message: 'Invalid diff' })
  id: number;

  @ApiProperty({ type: PlanningDtoId, required: true })
  @IsObject()
  @ValidateNested()
  planning_id: PlanningDtoId;

  @ApiProperty({ required: true })
  @IsNumber()
  balance: number;

  @ApiProperty({ required: true })
  @IsDate()
  date: Date;
}

export class CreateDiffDto extends OmitType(DiffDto, ['id']) {}
export class DiffDtoId extends PickType(DiffDto, ['id']) {}
