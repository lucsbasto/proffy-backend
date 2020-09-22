/* eslint-disable camelcase */
import { Schema, Document } from 'mongoose';

export interface IUser {
  _id?: string;
  name: string;
  avatar: string,
  last_name: string;
  mail: string;
  is_teacher: boolean;
  password: string;
  whatsapp: string;
  bio: string;
}

export const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true,
      default: 'https://api.adorable.io/avatars/285/abott@adorable.png'
    },
    mail: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    whatsapp: {
      type: String,
      required: true
    },
    is_teacher: {
      type: Boolean,
      required: true,
      default: false
    },
    bio: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

schema.methods.isTeacher = function () {
  return this.is_teacher;
};

export interface IUserModel extends Omit<IUser, '_id'>, Document {}
