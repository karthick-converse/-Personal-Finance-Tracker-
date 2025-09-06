import {
  BadRequestException,
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
          statuscode: HttpStatus.CONFLICT,
          message: 'User email already exits ',
        });
      }

      const data = await this.userrepository.create(createUserDto);
      await this.userrepository.save(data);
      return {
        success: true,
        statuscode: HttpStatus.CREATED,
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
          statuscode: HttpStatus.NOT_FOUND,
          message: 'user not found',
        });
      }

      const password_verify = await bcrypt.compare(
        password,
        check_user.password,
      );

      if (!password_verify) {
        throw new BadRequestException({
          success: false,
          statuscode: HttpStatus.BAD_REQUEST,
          message: 'user email or password wrong',
        });
      }
      const token_secret = process.env.token_secret || 'iambackendeveloper';

      const token = jwt.sign(payload, token_secret);

      return {
        success: true,
        statuscode: HttpStatus.OK,
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
          statuscode: HttpStatus.NOT_FOUND,
          message: 'user not found',
        });
      }

      return {
        success: true,
        statuscode: HttpStatus.OK,
        message: 'user fetch successfully',
        data: find_user,
      };
    } catch (error) {
      throw error;
    }
  }
}
