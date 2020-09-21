import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassesModule } from './classes/classes.module';
import { UsersModule } from './users/users.module';

const mongooseModuleOptions: MongooseModuleOptions = {
  retryAttempts: 3,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env']
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get('MONGO_DB'),
      ...mongooseModuleOptions
    }),
    inject: [ConfigService]
  }), UsersModule, ClassesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
