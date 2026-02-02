"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatController_1 = require("../controllers/chatController");
const router = (0, express_1.Router)();
// GET all messages
router.get('/messages', chatController_1.getMessages);
// POST a new message
router.post('/messages', chatController_1.postMessage);
exports.default = router;
