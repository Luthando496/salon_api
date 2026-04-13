import mongoose, { Schema, Document } from 'mongoose';

// 1. Create the TypeScript Interface
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional in case you add Google OAuth later
  phone?: string;
  role: 'admin' | 'client' | 'stylist';
  createdAt: Date;
  updatedAt: Date;
}

// 2. Create the Mongoose Schema
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // We will hash this later!
    phone: { type: String },
    role: { 
      type: String, 
      enum: ['admin', 'client', 'stylist'], 
      default: 'client' 
    },
  },
  { 
    timestamps: true // Automatically creates 'createdAt' and 'updatedAt' fields
  }
);

// 3. Export the Model
export default mongoose.model<IUser>('User', UserSchema);