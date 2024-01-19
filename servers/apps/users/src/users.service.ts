/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './DTOs/user.dto';
import { Response } from 'express';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto, response: Response) {
    const { name, email, password, phone_number } = registerDto;
    const emailExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (emailExists) {
      throw new BadRequestException('User with this Email already exists!');
    }

    const usersWithPhoneNumber = await this.prisma.user.findMany({
      where: {
        phone_number,
      },
    });

    if (usersWithPhoneNumber.length > 0) {
      throw new BadRequestException(
        'User already exist with this phone number!',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone_number,
      },
    });
    return { user, response };
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
    return this.prisma.user.findMany({});
  }
}
