import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiffService } from './diff.service';
import { CreateDiffDto } from './dto/create-diff.dto';
import { UpdateDiffDto } from './dto/update-diff.dto';

@Controller('diff')
export class DiffController {
  constructor(private readonly diffService: DiffService) {}

  @Post()
  create(@Body() createDiffDto: CreateDiffDto) {
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiffDto: UpdateDiffDto) {
    return this.diffService.update(+id, updateDiffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diffService.remove(+id);
  }
}
