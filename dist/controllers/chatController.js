"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = exports.getMessages = void 0;
const messageModel_1 = require("../models/messageModel");
// Get all messages
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield messageModel_1.Message.find().sort({ timestamp: 1 });
        res.json(messages);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});
exports.getMessages = getMessages;
// Save a new message
const postMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, message } = req.body;
        const newMessage = new messageModel_1.Message({ user, message });
        yield newMessage.save();
        res.status(201).json(newMessage);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to save message' });
    }
});
exports.postMessage = postMessage;
