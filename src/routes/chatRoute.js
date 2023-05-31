import express from "express";

const router = express.Router();

import { chat,message, } from "../controllers/chatController.js"

router.get('/', chat);

router.post('/message', message);



export default router;