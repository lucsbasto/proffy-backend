import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';

import { IClass } from './classes.schema';
import { ClassesService } from './classes.service';

interface IError {
  message: string,
  stack: string,
}

interface IResponse {
  [key: string]: IClass | IClass[] | IError | string
}

@Controller('classes')
export class ClassesController {
  constructor (private readonly classesService: ClassesService) {}

  @Post('')
  async create (@Body() classe: IClass): Promise<IResponse> {
    try {
      const newClasse: IClass = await this.classesService.create(classe);
      return { class: newClasse };
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
      const newClasse: IClass[] = await this.classesService.index();
      return { user: newClasse };
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
      const findedClass: IClass = await this.classesService.show(id);
      return { class: findedClass };
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
      const newClasse: string = await this.classesService.delete(id);
      return { user: newClasse };
    } catch (error) {
      const err: IError = {
        message: error.message,
        stack: error.stack
      };
      return { error: err };
    }
  }
}
