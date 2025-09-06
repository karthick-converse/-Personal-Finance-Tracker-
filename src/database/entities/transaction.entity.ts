import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum type {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity('Transaction')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
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
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'timestamp',
  })
  transaction_date: Date;

  @Column({
    type: 'timestamp',
    default: new Date(),
  })
  created_at: Date;
}
