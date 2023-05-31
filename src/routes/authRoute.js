import express from "express";
import { login, signUp, refresh } from "../controllers/authController.js";

const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);
router.post('/refresh', refresh);

export default router;