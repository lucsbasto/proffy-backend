import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ClassesController } from './classes.controller';
import { schema } from './classes.schema';
import { ClassesService } from './classes.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Classes', schema }])],
  controllers: [ClassesController],
  providers: [ClassesService]
})
export class ClassesModule {}
