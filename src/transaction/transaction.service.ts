import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}
  create(createTransactionDto: CreateTransactionDto) {
    return this.transactionRepository.save(createTransactionDto);
  }

  findAll() {
    return this.transactionRepository.find();
  }

  findOne(id: number) {
    return this.transactionRepository.findOneBy({ id: id });
  }

  update(updateTransactionDto: UpdateTransactionDto) {
    return this.transactionRepository.save(updateTransactionDto);
  }

  async remove(id: number) {
    let transaction = await this.transactionRepository.findOneBy({ id: id });
    return this.transactionRepository.softRemove(transaction);
  }
}
