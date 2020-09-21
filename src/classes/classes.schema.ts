import { Schema, Types } from 'mongoose';

export interface IClasse {
  _id?: string;
  subject: string;
  teacher: string;
  cost: number;
}

export const schema = Schema(
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
    timestamp: true,
    toJson: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._it;
        delete ret.__v;
      }
    }
  }
);

export interface IClasseModel extends Omit<IClasse, '_id'>, Document {}
