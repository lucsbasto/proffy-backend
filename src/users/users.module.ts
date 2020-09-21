import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { schema } from './users.schema';
import { UsersService } from './users.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema }])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
