import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UsersService } from '../users/users.service';
import { IClass, IClassModel } from './classes.schema';

@Injectable()
export class ClassesService {
  constructor (@InjectModel('Classes')
    private readonly ClasseModel: Model<IClassModel>,
    private readonly userService: UsersService
  ) {}

  async create (classe: IClass): Promise<IClass> {
    const isTeacher = this.userService.verifyIfIsTeacher(classe);
    if (isTeacher) {
      const newClass = new this.ClasseModel(classe);
      await newClass.save();
      return newClass;
    }
    throw new Error('Only teachers can create classes.');
  }

  async index (): Promise<IClass[]> {
    const classes = this.ClasseModel.find({}).populate('teacher').exec();
    return classes;
  }

  async show (id: string): Promise<IClass> {
    const findedClass = await this.ClasseModel.findById(id).populate('teacher').exec();
    return findedClass;
  }

  async delete (id: string): Promise<string> {
    const deletedClass = await this.ClasseModel.deleteOne({ _id: id });
    if (deletedClass.deletedCount) {
      return 'Class Deleted';
    }
    throw new Error('Class not found');
  }
}
