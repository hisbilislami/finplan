import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto, ItemDtoId } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import {
  AttachUserCreatedBy,
  AttachUserUpdatedBy,
} from 'src/etc/attach-user.decorator';

@ApiTags('Master Items')
@Controller('items')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiBody({ type: CreateItemDto })
  create(@AttachUserCreatedBy() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch()
  @ApiBody({ type: UpdateItemDto })
  update(@AttachUserUpdatedBy() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(updateItemDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() id: ItemDtoId) {
    return this.itemsService.remove(+id.id);
  }
}
