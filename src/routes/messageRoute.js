import express from "express";
import { sendMessage, messageFirebase } from "../controllers/messageController.js";

const router = express.Router();

router.get("/", sendMessage);
router.get("/firebase", messageFirebase);

export default router;