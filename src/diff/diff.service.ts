import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiffDto } from './dto/create-diff.dto';
import { UpdateDiffDto } from './dto/update-diff.dto';
import { Diff } from './entities/diff.entity';

@Injectable()
export class DiffService {
  constructor(
    @InjectRepository(Diff)
    private readonly diffRepository: Repository<Diff>,
  ) {}
  create(createDiffDto: CreateDiffDto) {
    return this.diffRepository.save(createDiffDto);
  }

  findAll() {
    return this.diffRepository.find();
  }

  findOne(id: number) {
    return this.diffRepository.findOneBy({ id: id });
  }

  update(updateDiffDto: UpdateDiffDto) {
    return this.diffRepository.save(updateDiffDto);
  }

  async remove(id: number) {
    let diff = await this.diffRepository.findOneBy({ id: id });
    return this.diffRepository.softRemove(diff);
  }
}
