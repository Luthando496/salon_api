import express from 'express';
import { registerUser, loginUser, getStylists, createStaff } from '../controllers/authController';
import User from '../models/User';
import { adminOnly, protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/stylists', getStylists);
router.post('/staff', protect, adminOnly, createStaff);

router.get('/all-users', async (req, res) => {
  const users = await User.find({});
  res.json({
    totalUsers: users.length,
    users: users
  });
});

export default router;