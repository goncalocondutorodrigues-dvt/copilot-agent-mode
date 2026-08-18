"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_model_1 = require("../models/team.model");
const teamsRouter = (0, express_1.Router)();
teamsRouter.get('/', async (_req, res) => {
    try {
        const teams = await team_model_1.TeamModel.find().limit(100).lean();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch teams', error });
    }
});
exports.default = teamsRouter;
