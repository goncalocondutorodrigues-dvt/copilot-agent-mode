import { Schema, model, Types } from 'mongoose';

const workoutSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  },
  { timestamps: true }
);

export const WorkoutModel = model('Workout', workoutSchema);
