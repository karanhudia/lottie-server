import { Schema, model } from 'mongoose';

export type LottieDocument = {
  createdAt: string;
  updatedAt: string;
  json: object;
  uuid: string;
  version: number;
} & Document;

const lottieSchema = new Schema({
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
  json: {
    type: JSON,
    required: true,
  },
  version: {
    type: Number,
    required: true,
  },
});

export const Lottie = model<LottieDocument>(
  process.env.MONGODB_COLLECTION_NAME ?? 'lotties',
  lottieSchema,
);
