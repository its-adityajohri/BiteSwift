/* eslint-disable prettier/prettier */
import {ObjectType, Field, Directive} from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')  

export class Avatars{
  @Field()
  id: string;

  @Field()
  public_id: string;

  @Field()
  url: string;

  @Field()
  userID: string;
}

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  avatar: Avatars;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}