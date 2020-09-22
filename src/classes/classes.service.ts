import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IClass, IClassModel } from './classes.schema';

@Injectable()
export class ClassesService {
  constructor (@InjectModel('Classes')
    private readonly ClasseModel: Model<IClassModel>
  ) {}

  async create (classe: IClass): Promise<IClass> {
    const newClass = new this.ClasseModel(classe);
    await newClass.save();
    return newClass;
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
