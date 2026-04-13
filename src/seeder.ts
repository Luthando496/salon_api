import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User';
import Service from './models/Service';
import Appointment from './models/Appointment';

// Load environment variables so we can connect to the database
dotenv.config();

const seedData = async () => {
  try {
    // 1. Connect to the database
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Database Connected. Starting Seeder...');

    // 2. Wipe existing data to prevent duplicates
    await Appointment.deleteMany();
    await Service.deleteMany();
    await User.deleteMany();
    console.log('Old data cleared.');

    // 3. Hash a default password for all seeded users
    const salt = await bcrypt.genSalt(10);
    const defaultPassword = await bcrypt.hash('password123', salt);

    // 4. Create Users (1 Admin, 2 Stylists, 2 Clients)
    const users = await User.insertMany([
      { name: 'Admin Luthando', email: 'admin@laura.com', password: defaultPassword, phone: '555-0001', role: 'admin' },
      { name: 'Elena (Master Colorist)', email: 'elena@laura.com', password: defaultPassword, phone: '555-0002', role: 'stylist' },
      { name: 'Marcus (Precision Cutter)', email: 'marcus@laura.com', password: defaultPassword, phone: '555-0003', role: 'stylist' },
      { name: 'Client Sarah', email: 'sarah@example.com', password: defaultPassword, phone: '555-0004', role: 'client' },
      { name: 'Client James', email: 'james@example.com', password: defaultPassword, phone: '555-0005', role: 'client' }
    ]);

    console.log('Users seeded.');

    // 5. Create Luxurious Services
    const services = await Service.insertMany([
      { name: 'Luxury Balayage', description: 'Hand-painted dimension tailored to your skin tone.', price: 250, duration: 180 },
      { name: 'Precision Cut', description: 'Structural styling that grows out flawlessly.', price: 120, duration: 60 },
      { name: 'Keratin Smoothing', description: 'Deep conditioning treatment for flawless texture.', price: 300, duration: 120 },
      { name: 'Restorative Gloss', description: 'High-shine treatment closing the cuticle.', price: 85, duration: 45 },
      { name: 'Gentleman’s Tailored Cut', description: 'Classic barbering techniques with modern styling.', price: 75, duration: 45 }
    ]);

    console.log('Services seeded.');

    // Helper to easily get IDs
    const elenaId = users[1]._id;
    const marcusId = users[2]._id;
    const sarahId = users[3]._id;
    const jamesId = users[4]._id;
    
    const balayageId = services[0]._id;
    const precisionCutId = services[1]._id;
    const mensCutId = services[4]._id;

    // Helper to generate a date relative to "today" at a specific time
    const getNextDate = (daysFromNow: number, hour: number, minute: number = 0) => {
      const d = new Date();
      d.setDate(d.getDate() + daysFromNow);
      d.setHours(hour, minute, 0, 0);
      return d;
    };

    // 6. Create Appointments linking the Users and Services
    await Appointment.insertMany([
      // Past Completed Appointment
      {
        client: sarahId, stylist: elenaId, service: balayageId, status: 'completed',
        startTime: getNextDate(-2, 10), endTime: getNextDate(-2, 13) // 3 hours
      },
      // Upcoming Confirmed Appointment (Tomorrow morning)
      {
        client: jamesId, stylist: marcusId, service: mensCutId, status: 'confirmed',
        startTime: getNextDate(1, 9), endTime: getNextDate(1, 9, 45) // 45 mins
      },
      // Upcoming Pending Appointment (Day after tomorrow)
      {
        client: sarahId, stylist: elenaId, service: precisionCutId, status: 'pending',
        startTime: getNextDate(2, 14), endTime: getNextDate(2, 15) // 1 hour
      }
    ]);

    console.log('Appointments seeded.');
    console.log('✅ Seeding Complete! You can log in with any email and the password: password123');
    process.exit();

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

seedData();