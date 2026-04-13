import { Request, Response } from 'express';
import Service from '../models/Service'; // No .js extension!

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Create a new service
// @route   POST /api/services
// @access  Private/Admin
export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, duration } = req.body;

    const service = new Service({
      name,
      description,
      price,
      duration,
    });

    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create service', error });
  }
};