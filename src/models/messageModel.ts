import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
  user: string;
  message: string;
  timestamp: Date;
}

const MessageSchema: Schema = new Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const Message = mongoose.model<IMessage>('Message', MessageSchema);
