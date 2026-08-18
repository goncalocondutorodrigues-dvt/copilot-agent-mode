import { Router, type Request, type Response } from 'express';
import { LeaderboardEntryModel } from '../models/leaderboard-entry.model';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const entries = await LeaderboardEntryModel.find().sort({ points: -1 }).limit(100).lean();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

export default leaderboardRouter;
