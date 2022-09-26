import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';
import { Planning } from './entities/planning.entity';

@Injectable()
export class PlanningService {
  constructor(
    @InjectRepository(Planning)
    private readonly planningRepository: Repository<Planning>,
  ) {}
  create(createPlanningDto: CreatePlanningDto) {
    return this.planningRepository.save(createPlanningDto);
  }

  findAll() {
    return this.planningRepository.find();
  }

  findOne(id: number) {
    return this.planningRepository.findOneBy({ id: id });
  }

  update(updatePlanningDto: UpdatePlanningDto) {
    return this.planningRepository.save(updatePlanningDto);
  }

  async remove(id: number) {
    let planning = await this.planningRepository.findOneBy({ id: id });
    return this.planningRepository.softRemove(planning);
  }
}
