import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PlanningService } from './planning.service';
import { CreatePlanningDto, PlanningDtoId } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import {
  AttachUserCreatedBy,
  AttachUserUpdatedBy,
} from 'src/etc/attach-user.decorator';

@ApiTags('Planning')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('planning')
export class PlanningController {
  constructor(private readonly planningService: PlanningService) {}

  @Post()
  @ApiBody({ type: CreatePlanningDto })
  create(@AttachUserCreatedBy() createPlanningDto: CreatePlanningDto) {
    return this.planningService.create(createPlanningDto);
  }

  @Get()
  findAll() {
    return this.planningService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planningService.findOne(+id);
  }

  @Patch()
  @ApiBody({ type: UpdatePlanningDto })
  update(@AttachUserUpdatedBy() updatePlanningDto: UpdatePlanningDto) {
    return this.planningService.update(updatePlanningDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() id: PlanningDtoId) {
    return this.planningService.remove(+id.id);
  }
}
