import { Schema, Types, Document } from 'mongoose';

/* eslint-disable camelcase */
export interface IScheduler {
  _id?: string;
  week_day: string;
  start_time: string;
  end_time: string;
  class: string;
}

export const schema = new Schema({
  week_day: {
    type: String,
    required: true
  },
  start_time: {
    type: String,
    required: true
  },
  end_time: {
    type: String,
    required: true
  },
  class: {
    type: Types.ObjectId,
    ref: 'Classes',
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
});

export interface ISchedulerModel extends Omit <IScheduler, '_id'>, Document {}
