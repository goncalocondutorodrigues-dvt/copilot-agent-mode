import express from 'express';
import { connectDatabase } from './config/database';
import usersRouter from './routes/users.routes';
import teamsRouter from './routes/teams.routes';
import activitiesRouter from './routes/activities.routes';
import leaderboardRouter from './routes/leaderboard.routes';
import workoutsRouter from './routes/workouts.routes';
import { getApiBaseUrl } from './utils/baseUrl';

const app = express();
const PORT = 8000;
const apiBaseUrl = getApiBaseUrl();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Basic route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date(), apiBaseUrl });
});

// Start server
async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Backend server is running on ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend server:', error);
    process.exit(1);
  }
}

void startServer();
