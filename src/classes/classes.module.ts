import { UsersService } from 'src/users/users.service';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { schema as userSchema } from '../users/users.schema';
import { ValidateIDMiddleware } from '../utils/validateid.middleware';
import { ClassesController } from './classes.controller';
import { schema as classSchema } from './classes.schema';
import { ClassesService } from './classes.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Classes', schema: classSchema }, { name: 'Users', schema: userSchema }])],
  controllers: [ClassesController],
  providers: [ClassesService, UsersService]
})
export class ClassesModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateIDMiddleware)
      .forRoutes(ClassesController);
  }
}
