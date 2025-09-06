import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { tokendecode } from 'src/decorator/token-decode.decorator';
import { token_user } from 'src/interface/token.interface';
import { TokenGuard } from '../guard/token.guard';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
@UseGuards(TokenGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @tokendecode() current_user: token_user,
  ) {
    return this.transactionsService.create(createTransactionDto, current_user);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('category') category: string,
    @tokendecode() current_user: token_user,
  ) {
    const data = { page, limit, category };
    return this.transactionsService.findAll(data,current_user);
  }

  @Get('summary')
  summary() {
    return this.transactionsService.getsummary();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
