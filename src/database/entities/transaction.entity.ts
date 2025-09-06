import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { User } from './user.entity';

export enum type {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity('Transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => User, (user) => user.id)
  user_id: User;

  @Column({
    type: 'decimal',
  })
  amount: number;

  @Column({
    enum: type,
  })
  type: type.INCOME;

  @Column()
  category: string;

  @Column({
    type: 'text',
  })
  description?: string;

  @Column({
    type: 'timestamp',
  })
  transaction_date: Date;

  @Column({
    type: 'timestamp',
  })
  created_at: Date;
}
