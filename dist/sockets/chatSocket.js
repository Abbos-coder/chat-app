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
exports.chatSocket = void 0;
const messageModel_1 = require("../models/messageModel");
const chatSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
        // Send all messages when a new user connects
        socket.on('getMessages', () => __awaiter(void 0, void 0, void 0, function* () {
            const messages = yield messageModel_1.Message.find().sort({ timestamp: 1 });
            socket.emit('allMessages', messages);
        }));
        // Receive and broadcast new message
        socket.on('sendMessage', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const newMessage = new messageModel_1.Message({ user: data.user, message: data.message });
            yield newMessage.save();
            io.emit('newMessage', newMessage);
        }));
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
exports.chatSocket = chatSocket;
