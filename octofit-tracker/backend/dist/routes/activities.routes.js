"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_model_1 = require("../models/activity.model");
const activitiesRouter = (0, express_1.Router)();
activitiesRouter.get('/', async (_req, res) => {
    try {
        const activities = await activity_model_1.ActivityModel.find().limit(100).lean();
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch activities', error });
    }
});
exports.default = activitiesRouter;
