import { Schema, model, Types } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true }
);

export const ActivityModel = model('Activity', activitySchema);
