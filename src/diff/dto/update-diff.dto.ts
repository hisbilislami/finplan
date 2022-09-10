import { PartialType } from '@nestjs/mapped-types';
import { CreateDiffDto } from './create-diff.dto';

export class UpdateDiffDto extends PartialType(CreateDiffDto) {}
