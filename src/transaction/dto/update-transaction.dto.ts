import { PartialType } from '@nestjs/swagger';
import { TransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(TransactionDto) {}
