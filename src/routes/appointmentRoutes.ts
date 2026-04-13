import express from 'express';
import { bookAppointment, getBookedSlots, getMyBookings, updateAppointmentStatus } from '../controllers/appointmentController';
import { adminOnly, protect } from '../middleware/authMiddleware';

const router = express.Router();

// Public route: Check availability
router.get('/schedule', getBookedSlots);

// Protected routes: Must be logged in
router.post('/', protect, bookAppointment);
router.get('/', protect, getMyBookings);
router.put('/:id/status', protect, adminOnly, updateAppointmentStatus);
export default router;