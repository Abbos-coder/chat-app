import express, { Application } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { connectDB } from './config/mongo';
import chatRoutes from './routes/chatRoutes';
import { chatSocket } from './sockets/chatSocket';

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use('/api', chatRoutes);

chatSocket(io);

const PORT = process.env.PORT || 8081;

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
