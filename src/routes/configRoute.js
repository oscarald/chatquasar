import express from "express";

const router = express.Router();

import { getConfig, initialConfig, changeConfig, updateRefresh } from "../controllers/configController.js"

router.get('/', getConfig);
router.get('/initialConfig', initialConfig);
router.post('/token', changeConfig);
router.post('/refresh', updateRefresh);



export default router;