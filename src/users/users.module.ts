import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ValidateIDMiddleware } from '../utils/validateid.middleware';
import { UsersController } from './users.controller';
import { schema } from './users.schema';
import { UsersService } from './users.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema }])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateIDMiddleware)
      .forRoutes(UsersController);
  }
}
