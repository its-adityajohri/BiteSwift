/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './DTOs/user.dto';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    //private readonly prisma;
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto, response: Response) {
    // const user = await this.prisma.user.create({
    //   data: {
    //     name: registerDto.name,
    //     email: registerDto.email,
    //     password: registerDto.password,
    //   },
    // });
    const user = {
      name: registerDto.name,
      email: registerDto.email,
      password: registerDto.password,
    };
    return user;
  }

  async login(registerDto: RegisterDto, response: Response) {
    // const user = await this.prisma.user.findUnique({
    //   where: {
    //     email: registerDto.email,
    //   },
    // });
    const user = {
      email: registerDto.email,
      password: registerDto.password,
    };
    return user;
  }

  async getUsers() {
    const users = [
      {
        id: 1,
        name: 'test',
        email: 'abc@xyz.com',
        password: 'testPassword1',
      },
      {
        id: 2,
        name: 'test2',
        email: 'def@xyz.com',
        password: 'testPassword2',
      },
    ];
    return users;
  }
}
