"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_model_1 = require("../models/workout.model");
const workoutsRouter = (0, express_1.Router)();
workoutsRouter.get('/', async (_req, res) => {
    try {
        const workouts = await workout_model_1.WorkoutModel.find().limit(100).lean();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch workouts', error });
    }
});
exports.default = workoutsRouter;
