import { Request, Response } from 'express';
import { Message } from '../models/messageModel';

// Get all messages
export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// Save a new message
export const postMessage = async (req: Request, res: Response) => {
  try {
    const { user, message } = req.body;
    const newMessage = new Message({ user, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message' });
  }
};
