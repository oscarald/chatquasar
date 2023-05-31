import express from "express"
import chat from "./chatRoute.js"
import auth from "./authRoute.js"
const router = express.Router()


router.use('/chat', chat);
router.use('/auth', auth);


export default router