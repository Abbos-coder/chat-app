import { Server, Socket } from 'socket.io';
import { Message } from '../models/messageModel';

export const chatSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    // Send all messages when a new user connects
    socket.on('getMessages', async () => {
      const messages = await Message.find().sort({ timestamp: 1 });
      socket.emit('allMessages', messages);
    });

    // Receive and broadcast new message
    socket.on('sendMessage', async (data) => {
      const newMessage = new Message({ user: data.user, message: data.message });
      await newMessage.save();
      io.emit('newMessage', newMessage);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
