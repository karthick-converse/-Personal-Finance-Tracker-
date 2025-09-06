import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.userService.login(createUserDto);
  }

  @Get()
  findone(id:number) {
    return this.userService.finduser(id);
  }

}
