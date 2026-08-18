import { Router, type Request, type Response } from 'express';
import { ActivityModel } from '../models/activity.model';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const activities = await ActivityModel.find().limit(100).lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

export default activitiesRouter;
