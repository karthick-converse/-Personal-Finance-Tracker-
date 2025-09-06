import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum type {
  INCOME = 'income',
  EXPENSE = 'expense',
}
export class CreateTransactionDto {
  @ApiProperty({
    example: '258.30',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @ApiProperty()
  @IsEnum(type)
  type: type.INCOME;

  @ApiProperty({
    example: 'Food',
  })
  @IsString()
  category: string;

  @ApiProperty({
    example: 'Lunch at restaurant',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: '2025-09-06',
  })
  @IsString()
  transaction_date: Date;
}
