import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import {
  CreateTransactionDto,
  TransactionDtoId,
} from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import {
  AttachUserCreatedBy,
  AttachUserUpdatedBy,
} from 'src/etc/attach-user.decorator';

@ApiTags('Transaction')
@ApiBearerAuth()
@Controller('transaction')
@UseGuards(JwtGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiBody({ type: CreateTransactionDto })
  create(@AttachUserCreatedBy() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch()
  @ApiBody({ type: UpdateTransactionDto })
  update(@AttachUserUpdatedBy() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(updateTransactionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() id: TransactionDtoId) {
    return this.transactionService.remove(+id.id);
  }
}
