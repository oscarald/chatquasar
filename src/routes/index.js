import express from "express"
import chat from "./chatRoute.js"
import auth from "./authRoute.js"
import config from "./configRoute.js"
import message from "./messageRoute.js"

const router = express.Router()



router.use('/chat', chat);
router.use('/auth', auth);
router.use('/config', config);
router.use('/message', message);

export default router