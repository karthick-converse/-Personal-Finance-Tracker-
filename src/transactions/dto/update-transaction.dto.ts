import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsEnum, IsOptional, IsString } from 'class-validator';

export enum type {
  INCOME = 'income',
  EXPENSE = 'expense',
}
export class UpdateTransactionDto {
  @ApiProperty({
    example: '258.30',
  })
  @IsOptional()
  @IsDecimal()
  amount: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(type)
  type: type.INCOME;

  @ApiProperty({
    example: 'Food',
  })
  @IsOptional()
  @IsString()
  category: string;

  @ApiProperty({
    example: 'Lunch at restaurant',
  })
  @IsOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: '2025-09-06',
  })
  @IsOptional()
  @IsString()
  transaction_date: Date;
}
