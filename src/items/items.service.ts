import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  create(createItemDto: CreateItemDto) {
    return this.itemRepository.save(createItemDto);
  }

  findAll() {
    return this.itemRepository.find();
  }

  findOne(id: number) {
    return this.itemRepository.findOneBy({
      id: id,
    });
  }

  update(updateItemDto: UpdateItemDto) {
    return this.itemRepository.save(updateItemDto);
  }

  async remove(id: number) {
    let item = await this.itemRepository.findOneBy({ id: id });
    return this.itemRepository.softRemove(item);
  }
}
