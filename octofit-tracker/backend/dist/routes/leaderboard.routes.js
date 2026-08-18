"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_entry_model_1 = require("../models/leaderboard-entry.model");
const leaderboardRouter = (0, express_1.Router)();
leaderboardRouter.get('/', async (_req, res) => {
    try {
        const entries = await leaderboard_entry_model_1.LeaderboardEntryModel.find().sort({ points: -1 }).limit(100).lean();
        res.json(entries);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch leaderboard', error });
    }
});
exports.default = leaderboardRouter;
