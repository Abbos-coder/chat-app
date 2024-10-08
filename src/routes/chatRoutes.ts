import { Router } from 'express';
import { getMessages, postMessage } from '../controllers/chatController';

const router = Router();

// GET all messages
router.get('/messages', getMessages);

// POST a new message
router.post('/messages', postMessage);

export default router;
