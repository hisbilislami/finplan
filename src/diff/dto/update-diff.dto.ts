import { PartialType } from '@nestjs/swagger';
import { DiffDto } from './create-diff.dto';

export class UpdateDiffDto extends PartialType(DiffDto) {}
