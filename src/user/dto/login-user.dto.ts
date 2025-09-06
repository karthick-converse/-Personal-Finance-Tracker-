import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class loginUserDto {
  @ApiProperty({
    example: 'Karthick@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'admin@123',
  })
  @IsString()
  password: string;
}
