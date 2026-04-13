import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  client: mongoose.Types.ObjectId;
  stylist: mongoose.Types.ObjectId;
  service: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema: Schema = new Schema(
  {
    // The 'ref' tells Mongoose which model this ObjectId belongs to
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stylist: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    
    // Dates are critical for the booking system
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
      default: 'pending' 
    },
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);