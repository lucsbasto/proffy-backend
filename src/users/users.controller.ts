import { Controller, Post, Get, Body } from '@nestjs/common';

import { IUser, IUserModel } from './users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}
  @Post()
  async store (@Body() user: IUser): Promise<IUser> {
    const createdUser: IUser = await this.usersService.store(user);
    return createdUser;
  }
}
