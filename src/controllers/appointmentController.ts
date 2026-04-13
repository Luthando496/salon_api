import { Request, Response } from 'express';
import Appointment from '../models/Appointment';
import Service from '../models/Service';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private (Logged in clients)
export const bookAppointment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { stylistId, serviceId, startTime } = req.body;
    const clientId = req.user._id;

    // 1. Find the service to get its duration
    const service = await Service.findById(serviceId);
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }

    // 2. Calculate the End Time
    const start = new Date(startTime);
    // Add the service duration (in minutes) to the start time
    const end = new Date(start.getTime() + service.duration * 60000); 

    // 3. Check for double bookings (Overlap Logic)
    // An overlap happens if an existing appointment starts before our new END time, 
    // AND ends after our new START time.
    const overlappingAppointment = await Appointment.findOne({
      stylist: stylistId,
      status: { $in: ['pending', 'confirmed'] }, // Ignore cancelled/completed ones
      startTime: { $lt: end },
      endTime: { $gt: start }
    });

    if (overlappingAppointment) {
      res.status(400).json({ message: 'Stylist is not available at this time.' });
      return;
    }

    // 4. Create the appointment
    const appointment = new Appointment({
      client: clientId,
      stylist: stylistId,
      service: serviceId,
      startTime: start,
      endTime: end,
      status: 'pending' // Admin can confirm it later
    });

    const createdAppointment = await appointment.save();
    res.status(201).json(createdAppointment);

  } catch (error) {
    res.status(500).json({ message: 'Failed to book appointment', error });
  }
};

// @desc    Get booked slots for a specific date and stylist
// @route   GET /api/appointments/schedule?stylistId=123&date=2023-10-31
// @access  Public (Frontend needs this to disable booked times on the calendar)
export const getBookedSlots = async (req: Request, res: Response): Promise<void> => {
  try {
    const { stylistId, date } = req.query;

    if (!stylistId || !date) {
      res.status(400).json({ message: 'Please provide both stylistId and date' });
      return;
    }

    // Create a start and end of the requested day to filter appointments
    const searchDate = new Date(date as string);
    const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));

    const appointments = await Appointment.find({
      stylist: stylistId as string,
      status: { $in: ['pending', 'confirmed'] },
      startTime: { $gte: startOfDay, $lte: endOfDay }
    }).select('startTime endTime'); // We only send the times back to keep client data private!

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch schedule', error });
  }
};

// @desc    Get all appointments for the logged-in user (Admin sees all, Client sees theirs)
// @route   GET /api/appointments
// @access  Private
// @desc    Get all appointments for the logged-in user (Admin sees all, Client sees theirs)
// @route   GET /api/appointments
// @access  Private
// @desc    Get all appointments for the logged-in user (Admin sees all, Client sees theirs)
// @route   GET /api/appointments
// @access  Private
export const getMyBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log("1. Backend hit the getMyBookings route!"); // <--- ADD THIS
    let query = {};
    
    if (req.user.role === 'client') {
      query = { client: req.user._id };
    } else if (req.user.role === 'stylist') {
      query = { stylist: req.user._id };
    }

    console.log("2. Query built, asking MongoDB for data..."); // <--- ADD THIS

    const appointments = await Appointment.find(query)
      .populate('client', 'name email phone') 
      .populate('stylist', 'name')
      .populate('service', 'name price duration')
      .sort({ startTime: 1 }); 

    console.log("3. Data found! Sending to frontend."); // <--- ADD THIS
    res.json(appointments);

  } catch (error) {
    console.error("ERROR CAUGHT:", error); // <--- Make sure this is here
    res.status(500).json({ message: 'Failed to fetch bookings', error });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private (Admin only)
export const updateAppointmentStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      res.status(404).json({ message: 'Appointment not found' });
      return;
    }

    appointment.status = status;
    const updatedAppointment = await appointment.save();

    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error });
  }
};