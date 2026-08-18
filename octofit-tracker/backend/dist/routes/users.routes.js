"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', async (_req, res) => {
    try {
        const users = await user_model_1.UserModel.find().limit(100).lean();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});
exports.default = usersRouter;
