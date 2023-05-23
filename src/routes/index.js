import express from "express"
const router = express.Router()
import {chat } from "../controllers/chatController.js"

router.use('/chat', chat);


export default router