import { Schema, Types, Document } from 'mongoose';

export interface IClass {
  _id?: string;
  subject: string;
  teacher: string;
  cost: number;
}

export const schema = new Schema(
  {
    subject: {
      type: String,
      required: true
    },
    teacher: {
      type: Types.ObjectId,
      ref: 'Users',
      required: true
    },
    cost: {
      type: Number,
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

export interface IClassModel extends Omit<IClass, '_id'>, Document {}
