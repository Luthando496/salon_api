import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Note the .js extension for ES Modules
import { AuthRequest } from '../middleware/authMiddleware';

// Helper function to generate JWT
const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Extract 'role' from the request body
    const { name, email, password, phone, role } = req.body;

    // Optional Validation: Ensure the role is one of your allowed options
    if (role && !['client', 'admin', 'stylist'].includes(role)) {
      res.status(400).json({ message: 'Invalid role specified' });
      return;
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the user, defaulting to 'client' if no role is provided
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || 'client', 
    });

    // 5. Send response with token
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });

    // 2. Check password
    if (user && user.password && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Get all stylists
// @route   GET /api/auth/stylists
export const getStylists = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find all users with the role of 'stylist', but don't send their passwords!
    const stylists = await User.find({ role: 'stylist' }).select('-password');
    res.json(stylists);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Create new staff member (Stylist/Admin)
// @route   POST /api/auth/staff
// @access  Private/Admin
export const createStaff = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name, email, password: hashedPassword, phone, role
    });

    // We don't send a token back because the Admin is the one creating this, 
    // we don't want to accidentally log the Admin out!
    res.status(201).json({
      _id: user.id, name: user.name, email: user.email, role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};