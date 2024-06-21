import { Schema, model } from 'mongoose';

export interface LottieDocument extends Document {
    createdAt: string;
    updatedAt: string;
    json: object;
    uuid: string;
}

const lottieSchema = new Schema({
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    uuid: {
        type: String,
        required: true
    },
    json: {
        type: JSON,
        required: true
    }
});

export const Lottie = model<LottieDocument>(process.env.MONGODB_COLLECTION_NAME || "lotties", lottieSchema);
