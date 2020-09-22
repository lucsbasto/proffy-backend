import { Model } from 'mongoose';
import { IClass } from 'src/classes/classes.schema';

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

  async show (id: string): Promise<IUser> {
    const user = await this.UserModel.findOne({ _id: id });
    return user;
  }

  async delete (id: string): Promise<string> {
    const deletedUser = await this.UserModel.deleteOne({ _id: id });
    if (deletedUser.deletedCount) {
      return 'User Deleted';
    }
    throw new Error('User not found');
  }
}
