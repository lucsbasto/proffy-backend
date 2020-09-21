import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IUser, IUserModel } from './users.schema';

@Injectable()
export class UsersService {
  constructor (@InjectModel('Users')
   private readonly UserModel: Model<IUserModel>
  ) {}

  async store (user: IUser): Promise<IUser> {
    const newUser = new this.UserModel(user);
    await newUser.save();
    return newUser;
  }

  async index (): Promise<IUser[]> {
    const users = await this.UserModel.find({});
    return users;
  }
}
