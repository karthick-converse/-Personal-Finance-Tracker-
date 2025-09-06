import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { loginUserDto } from './dto/login-user.dto';

import { tokendecode } from '../decorator/token-decode.decorator';
import { token_user } from '../interface/token.interface';
import { TokenGuard } from 'src/guard/token.guard';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() createUserDto: loginUserDto) {
    return this.userService.login(createUserDto);
  }

  @Get('/profile')
  @UseGuards(TokenGuard)
  findone(@tokendecode() current_user: token_user) {
    const id = current_user.id;
    return this.userService.finduser(id);
  }
}
