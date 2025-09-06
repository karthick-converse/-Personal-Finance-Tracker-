import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/entities/user.entity';
// import { Transaction } from './database/entities/transaction.entity';

@Module({
  imports: [
    UserModule,
    TransactionsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pgadmin',
      entities: [User],
      database: 'dynamic_form',
      synchronize: true,
    }),
  ],
})
export class AppModule {}
