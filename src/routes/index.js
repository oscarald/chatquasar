import express from "express"
import chat from "./chatRoute.js"
const router = express.Router()


router.use('/chat', chat);


export default router