"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const teams_routes_1 = __importDefault(require("./routes/teams.routes"));
const activities_routes_1 = __importDefault(require("./routes/activities.routes"));
const leaderboard_routes_1 = __importDefault(require("./routes/leaderboard.routes"));
const workouts_routes_1 = __importDefault(require("./routes/workouts.routes"));
const baseUrl_1 = require("./utils/baseUrl");
const app = (0, express_1.default)();
const PORT = 8000;
const apiBaseUrl = (0, baseUrl_1.getApiBaseUrl)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/users', users_routes_1.default);
app.use('/api/teams', teams_routes_1.default);
app.use('/api/activities', activities_routes_1.default);
app.use('/api/leaderboard', leaderboard_routes_1.default);
app.use('/api/workouts', workouts_routes_1.default);
// Basic route
app.get('/api/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: new Date(), apiBaseUrl });
});
// Start server
async function startServer() {
    try {
        await (0, database_1.connectDatabase)();
        app.listen(PORT, () => {
            console.log(`Backend server is running on ${apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend server:', error);
        process.exit(1);
    }
}
void startServer();
