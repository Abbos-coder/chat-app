"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const mongo_1 = require("./config/mongo");
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const chatSocket_1 = require("./sockets/chatSocket");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, mongo_1.connectDB)();
// Routes
app.use('/api', chatRoutes_1.default);
(0, chatSocket_1.chatSocket)(io);
const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
