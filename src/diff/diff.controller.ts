import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import {
  AttachUserCreatedBy,
  AttachUserUpdatedBy,
} from 'src/etc/attach-user.decorator';
import { DiffService } from './diff.service';
import { CreateDiffDto, DiffDtoId } from './dto/create-diff.dto';
import { UpdateDiffDto } from './dto/update-diff.dto';

@ApiTags('Diff')
@ApiBearerAuth()
@Controller('diff')
@UseGuards(JwtGuard)
export class DiffController {
  constructor(private readonly diffService: DiffService) {}

  @Post()
  @ApiBody({ type: CreateDiffDto })
  create(@AttachUserCreatedBy() createDiffDto: CreateDiffDto) {
    return this.diffService.create(createDiffDto);
  }

  @Get()
  findAll() {
    return this.diffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diffService.findOne(+id);
  }

  @Patch()
  @ApiBody({ type: UpdateDiffDto })
  update(@AttachUserUpdatedBy() updateDiffDto: UpdateDiffDto) {
    return this.diffService.update(updateDiffDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() id: DiffDtoId) {
    return this.diffService.remove(+id.id);
  }
}
