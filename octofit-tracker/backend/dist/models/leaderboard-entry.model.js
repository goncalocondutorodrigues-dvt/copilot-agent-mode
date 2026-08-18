"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardEntryModel = void 0;
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0, default: 0 },
}, { timestamps: true });
exports.LeaderboardEntryModel = (0, mongoose_1.model)('LeaderboardEntry', leaderboardEntrySchema);
