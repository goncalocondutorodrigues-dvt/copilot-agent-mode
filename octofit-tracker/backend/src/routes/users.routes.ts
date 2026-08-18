import { Router, type Request, type Response } from 'express';
import { UserModel } from '../models/user.model';

const usersRouter = Router();

usersRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find().limit(100).lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

export default usersRouter;
