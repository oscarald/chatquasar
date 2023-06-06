import express from "express";
import { login, signUp, refresh, test, proting } from "../controllers/authController.js";
import {requireRefreshToken} from "../middlewares/requireRefreshToken.js"
import {verifyToken} from "../middlewares/verifyToken.js"

const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);
router.post('/refresh',requireRefreshToken, refresh);
router.get('/testing', verifyToken, proting)

router.post('/test', test)


export default router;