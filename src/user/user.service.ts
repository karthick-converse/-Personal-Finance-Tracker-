import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { loginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userrepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const check_user = await this.userrepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
      if (check_user) {
        throw new ConflictException({
          success: false,
          message: 'User email already exits ',
        });
      }

      const data = await this.userrepository.create(createUserDto);
      await this.userrepository.save(data);
      return {
        success: HttpStatus.OK,
        message: `${data.full_name} Createed success fully`,
      };
    } catch (e) {
      throw e;
    }
  }

  async login(LoginUserDto: loginUserDto) {
    const { email, password } = LoginUserDto;
    try {
      const check_user = await this.userrepository.findOne({
        where: {
          email: email,
        },
      });
      const payload = {
        id: check_user?.id,
        name: check_user?.full_name,
        email: check_user?.email,
      };
      if (!check_user) {
        throw new NotFoundException({
          success: false,
          message: 'user not found',
        });
      }

      const password_verify = await bcrypt.compare(
        password,
        check_user.password,
      );

      if (!password_verify) {
        throw {
          success: false,
          message: 'user email or password wrong',
        };
      }
      const token = jwt.sign(payload, 'karthick');

      return {
        success: true,
        message: 'login successful',
        token,
      };
    } catch (e) {
      throw e;
    }
  }

  async finduser(userid: string) {
    try {
      const find_user = await this.userrepository.findOne({
        where: { id: userid },
      });

      if (!find_user) {
        throw new NotFoundException({
          success: false,
          message: 'user not found',
        });
      }

      return {
        success: true,
        message: 'user fetch successfully',
        data: find_user,
      };
    } catch (error) {
      throw error;
    }
  }
}
