import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(

    @InjectRepository(User)
    private readonly userreporisory:Repository<User>
  ){}

  create(createUserDto: CreateUserDto) {
    
  }
  login(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }


  finduser(id: number) {
    return `This action returns a #${id} user`;
  }

}
