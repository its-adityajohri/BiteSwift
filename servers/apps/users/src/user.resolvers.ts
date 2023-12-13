/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BadRequestException, UseFilters } from "@nestjs/common";
import { Args, Context, Query, Mutation, Resolver } from "@nestjs/graphql";
import { RegisterResponse } from "./types/user.types";
import { RegisterDto } from "./DTOs/user.dto";
import { Response } from "express";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";

@Resolver('User')
//@UseFilters
export class UserResolver {
    constructor(private readonly usersService: UsersService) {}

    @Mutation(() => RegisterResponse)
    async register(
        @Args('registerDto') registerDto: RegisterDto,
        @Context() context: {res: Response},
    ): Promise<RegisterResponse> {
        if (!registerDto.email || !registerDto.email || !registerDto.password) {
            throw new BadRequestException('Please fill all the fields');
        }
        const user = await this.usersService.register(registerDto, context.res);
        return { user };
    }

    @Query(() => [User])
    async getUsers(){
        return this.usersService.getUsers();
    }
} 

