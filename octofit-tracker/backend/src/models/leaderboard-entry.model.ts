import { Schema, model, Types } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true }
);

export const LeaderboardEntryModel = model('LeaderboardEntry', leaderboardEntrySchema);
