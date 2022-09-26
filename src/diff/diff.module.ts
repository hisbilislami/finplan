import { Module } from '@nestjs/common';
import { DiffService } from './diff.service';
import { DiffController } from './diff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diff } from './entities/diff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diff])],
  controllers: [DiffController],
  providers: [DiffService],
})
export class DiffModule {}
