import { PartialType } from '@nestjs/swagger';
import { PlanningDto } from './create-planning.dto';

export class UpdatePlanningDto extends PartialType(PlanningDto) {}
