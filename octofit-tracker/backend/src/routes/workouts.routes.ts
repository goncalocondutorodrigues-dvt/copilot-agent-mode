import { Router, type Request, type Response } from 'express';
import { WorkoutModel } from '../models/workout.model';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const workouts = await WorkoutModel.find().limit(100).lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

export default workoutsRouter;
