import express from "express";

const router = express.Router();

import { chat, signUp, login, message } from "../controllers/chatController.js"

router.get('/', chat);
router.post('/login', login);
router.post('/signup', signUp);
router.post('/message', message);


export default router;