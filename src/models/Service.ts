import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  price: number;
  duration: number; // Stored in minutes (e.g., 60, 90, 120)
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model<IService>('Service', ServiceSchema);