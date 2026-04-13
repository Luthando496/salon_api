import express from 'express';
import { getServices, createService } from '../controllers/serviceController';
import { protect, adminOnly } from '../middleware/authMiddleware';

const router = express.Router();

// Public route to get all services
router.get('/', getServices);

// Protected route: Must be logged in (protect) AND be an admin (adminOnly)
router.post('/', protect, adminOnly, createService);

export default router;