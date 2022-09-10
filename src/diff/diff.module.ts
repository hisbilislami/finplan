import { Module } from '@nestjs/common';
import { DiffService } from './diff.service';
import { DiffController } from './diff.controller';

@Module({
  controllers: [DiffController],
  providers: [DiffService]
})
export class DiffModule {}
