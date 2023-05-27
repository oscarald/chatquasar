import express from "express";

const router = express.Router();

import { chat, signUp, login, message, refresh } from "../controllers/chatController.js"

router.get('/', chat);
router.post('/login', login);
router.post('/signup', signUp);
router.post('/message', message);
router.post('/refresh', refresh);


export default router;