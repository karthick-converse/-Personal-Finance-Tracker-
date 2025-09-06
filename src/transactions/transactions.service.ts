import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/database/entities/transaction.entity';
import { Like, Repository } from 'typeorm';
import { token_user } from 'src/interface/token.interface';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { pagination } from 'src/interface/pagenation.interface';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionrepo: Repository<Transaction>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
    current_user: token_user,
  ) {
    try {
      const create_transaction = await this.transactionrepo.create({
        user_id: current_user,
        amount: createTransactionDto.amount,
        type: createTransactionDto.type,
        category: createTransactionDto.category,
        description: createTransactionDto.description,
        transaction_date: createTransactionDto.transaction_date,
      });

      const save_transaction =
        await this.transactionrepo.save(create_transaction);

      return {
        success: true,
        statusCode: HttpStatus.CREATED,
        data: save_transaction,
      };
    } catch (err) {
      throw err;
    }
  }

  async findAll(data: pagination) {
    try {
      const { page, limit, category } = data;

      const offset = (page - 1) * limit;
      const find_data = await this.transactionrepo.find({
        where: { category: Like('%' + category + '%') },
        skip: offset,
        take: limit,
      });
      if (find_data.length <= 0) {
        throw new NotFoundException({
          success: false,
          message: 'data not found',
          statusCode: HttpStatus.NOT_FOUND,
        });
      }
      return {
        success: true,
        statusCode: HttpStatus.OK,
        data: find_data,
      };
    } catch (e) {
      throw e;
    }
  }

  async findOne(userid: string) {
    try {
      const find_single_user = await this.transactionrepo.findOneBy({
        id: userid,
      });
      if (!find_single_user) {
        throw new NotFoundException({
          success: false,
          statuscode: HttpStatus.NOT_FOUND,
          message: 'Transaction not found',
        });
      }
      return {
        success: true,
        statusCode: HttpStatus.OK,
        data: find_single_user,
      };
    } catch (e) {
      throw e;
    }
  }

  async update(userid: string, updateTransactionDto: UpdateTransactionDto) {
    try {
      const find_trans = await this.transactionrepo.findOneBy({ id: userid });
      if (!find_trans) {
        throw new NotFoundException({
          success: false,
          statuscode: HttpStatus.NOT_FOUND,
          message: 'Transction not found',
        });
      }

      const update_trans = await this.transactionrepo.update(
        find_trans.id,
        updateTransactionDto,
      );

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: `${userid} is updated success fully`,
      };
    } catch (e) {
      throw e;
    }
  }
  async remove(userid: string) {
    try {
      const find_trans = await this.transactionrepo.findOneBy({ id: userid });
      if (!find_trans) {
        throw new NotFoundException({
          success: false,
          message: 'Transction not found',
        });
      }
      await this.transactionrepo.delete(find_trans.id);

      return {
        success: true,
        message: `${userid}  Deleted successfully`,
      };
    } catch (e) {
      throw e;
    }
  }

  async getsummary() {
    try {
      const getall = await this.transactionrepo.find();
      const income: any = [];
      const expense: any = [];

      const count = getall.length;

      getall.map((item) => {
        if (item.type == 'income') {
          income.push(item.amount);
        } else if (item.type == 'expense') {
          expense.push(item.amount);
        }
      });

      const total_income = income.reduce((pre, cur) => {
        return Number(pre) + Number(cur);
      }, 0);
      const total_expense = expense.reduce((pre, cur) => {
        return Number(pre) + Number(cur);
      }, 0);

      const balance = total_income - total_expense;

      return {
        success: true,
        statuscode: HttpStatus.OK,
        data: {
          total_income: total_income,
          total_expenses: total_expense,
          balance: balance,
          transaction_count: count,
        },
      };
    } catch (e) {
      throw e;
    }
  }
}
