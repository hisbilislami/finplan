import { Injectable } from '@nestjs/common';
import { CreateDiffDto } from './dto/create-diff.dto';
import { UpdateDiffDto } from './dto/update-diff.dto';

@Injectable()
export class DiffService {
  create(createDiffDto: CreateDiffDto) {
    return 'This action adds a new diff';
  }

  findAll() {
    return `This action returns all diff`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diff`;
  }

  update(id: number, updateDiffDto: UpdateDiffDto) {
    return `This action updates a #${id} diff`;
  }

  remove(id: number) {
    return `This action removes a #${id} diff`;
  }
}
