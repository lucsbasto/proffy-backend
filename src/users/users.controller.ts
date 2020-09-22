import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';

import { IUser } from './users.schema';
import { UsersService } from './users.service';

interface IError {
  message: string,
  stack: string,
}

interface IResponse {
  [key: string]: IUser | IUser[] | IError | string
}

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}
  @Post('')
  async store (@Body() user: IUser): Promise<IResponse> {
    try {
      const createdUser: IUser = await this.usersService.store(user);
      return { user: createdUser };
    } catch (error) {
      const err: IError = {
        message: error.message,
        stack: error.stack
      };
      return { error: err };
    }
  }

  @Get('')
  async index (): Promise<IResponse> {
    try {
      const users: IUser[] = await this.usersService.index();
      return { users };
    } catch (error) {
      const err: IError = {
        message: error.message,
        stack: error.stack
      };
      return { error: err };
    }
  }

  @Get(':id')
  async show (@Param('id') id: string): Promise<IResponse> {
    try {
      const user: IUser = await this.usersService.show(id);
      return { user };
    } catch (error) {
      const err: IError = {
        message: error.message,
        stack: error.stack
      };
      return { error: err };
    }
  }

  @Delete(':id')
  async delete (@Param('id') id: string): Promise<IResponse> {
    try {
      const user = await this.usersService.delete(id);
      return { message: user };
    } catch (error) {
      const err: IError = {
        message: error.message,
        stack: error.stack
      };
      return { error: err };
    }
  }
}
