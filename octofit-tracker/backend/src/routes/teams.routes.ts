import { Router, type Request, type Response } from 'express';
import { TeamModel } from '../models/team.model';

const teamsRouter = Router();

teamsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const teams = await TeamModel.find().limit(100).lean();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

export default teamsRouter;
