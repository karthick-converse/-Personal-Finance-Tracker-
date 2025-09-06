import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/entities/user.entity';
import { Transaction } from './database/entities/transaction.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    UserModule,
    TransactionsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.host,
      port: Number(process.env.port),
      username: 'postgres',
      password: process.env.password,
      entities: [User, Transaction],
      database: process.env.database,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
