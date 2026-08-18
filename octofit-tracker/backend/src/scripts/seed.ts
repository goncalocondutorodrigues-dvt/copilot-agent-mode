import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { UserModel } from '../models/user.model';
import { TeamModel } from '../models/team.model';
import { ActivityModel } from '../models/activity.model';
import { LeaderboardEntryModel } from '../models/leaderboard-entry.model';
import { WorkoutModel } from '../models/workout.model';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    console.log('Seed the octofit_db database with test data');
    await connectDatabase();

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardEntryModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.insertMany([
      { name: 'Maya Chen', email: 'maya.chen@octofit.app' },
      { name: 'Lucas Fernandes', email: 'lucas.fernandes@octofit.app' },
      { name: 'Aisha Patel', email: 'aisha.patel@octofit.app' },
      { name: 'Diego Alvarez', email: 'diego.alvarez@octofit.app' },
      { name: 'Sofia Rossi', email: 'sofia.rossi@octofit.app' },
      { name: 'Noah Kim', email: 'noah.kim@octofit.app' },
    ]);

    const userByEmail = new Map(users.map((user) => [user.email, user]));

    await TeamModel.insertMany([
      {
        name: 'Summit Sprinters',
        members: [
          userByEmail.get('maya.chen@octofit.app')?._id,
          userByEmail.get('lucas.fernandes@octofit.app')?._id,
          userByEmail.get('aisha.patel@octofit.app')?._id,
        ],
      },
      {
        name: 'Pulse Builders',
        members: [
          userByEmail.get('diego.alvarez@octofit.app')?._id,
          userByEmail.get('sofia.rossi@octofit.app')?._id,
          userByEmail.get('noah.kim@octofit.app')?._id,
        ],
      },
    ]);

    await ActivityModel.insertMany([
      {
        userId: userByEmail.get('maya.chen@octofit.app')?._id,
        type: '5K Tempo Run',
        durationMinutes: 34,
        caloriesBurned: 412,
      },
      {
        userId: userByEmail.get('maya.chen@octofit.app')?._id,
        type: 'HIIT Circuit',
        durationMinutes: 28,
        caloriesBurned: 360,
      },
      {
        userId: userByEmail.get('lucas.fernandes@octofit.app')?._id,
        type: 'Strength Session - Upper Body',
        durationMinutes: 52,
        caloriesBurned: 488,
      },
      {
        userId: userByEmail.get('aisha.patel@octofit.app')?._id,
        type: 'Power Yoga Flow',
        durationMinutes: 45,
        caloriesBurned: 290,
      },
      {
        userId: userByEmail.get('diego.alvarez@octofit.app')?._id,
        type: 'Indoor Cycling Intervals',
        durationMinutes: 40,
        caloriesBurned: 515,
      },
      {
        userId: userByEmail.get('sofia.rossi@octofit.app')?._id,
        type: 'Rowing Erg Session',
        durationMinutes: 38,
        caloriesBurned: 430,
      },
      {
        userId: userByEmail.get('noah.kim@octofit.app')?._id,
        type: 'Trail Run',
        durationMinutes: 57,
        caloriesBurned: 610,
      },
      {
        userId: userByEmail.get('noah.kim@octofit.app')?._id,
        type: 'Mobility and Core',
        durationMinutes: 25,
        caloriesBurned: 165,
      },
    ]);

    await LeaderboardEntryModel.insertMany([
      { userId: userByEmail.get('noah.kim@octofit.app')?._id, points: 1240 },
      { userId: userByEmail.get('diego.alvarez@octofit.app')?._id, points: 1125 },
      { userId: userByEmail.get('maya.chen@octofit.app')?._id, points: 1040 },
      { userId: userByEmail.get('lucas.fernandes@octofit.app')?._id, points: 980 },
      { userId: userByEmail.get('sofia.rossi@octofit.app')?._id, points: 910 },
      { userId: userByEmail.get('aisha.patel@octofit.app')?._id, points: 860 },
    ]);

    await WorkoutModel.insertMany([
      {
        userId: userByEmail.get('maya.chen@octofit.app')?._id,
        title: 'Speed Builder Run + Core',
        difficulty: 'intermediate',
      },
      {
        userId: userByEmail.get('lucas.fernandes@octofit.app')?._id,
        title: 'Push Pull Strength Split',
        difficulty: 'advanced',
      },
      {
        userId: userByEmail.get('aisha.patel@octofit.app')?._id,
        title: 'Low Impact Mobility Flow',
        difficulty: 'beginner',
      },
      {
        userId: userByEmail.get('diego.alvarez@octofit.app')?._id,
        title: 'Bike Threshold Builder',
        difficulty: 'intermediate',
      },
      {
        userId: userByEmail.get('sofia.rossi@octofit.app')?._id,
        title: 'Endurance Row + Legs',
        difficulty: 'advanced',
      },
      {
        userId: userByEmail.get('noah.kim@octofit.app')?._id,
        title: 'Trail Prep Conditioning',
        difficulty: 'intermediate',
      },
    ]);

    const [userCount, teamCount, activityCount, leaderboardCount, workoutCount] = await Promise.all([
      UserModel.countDocuments(),
      TeamModel.countDocuments(),
      ActivityModel.countDocuments(),
      LeaderboardEntryModel.countDocuments(),
      WorkoutModel.countDocuments(),
    ]);

    console.log(
      `Seed complete: users=${userCount}, teams=${teamCount}, activities=${activityCount}, leaderboard=${leaderboardCount}, workouts=${workoutCount}`
    );
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
