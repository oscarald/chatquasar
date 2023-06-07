
import jwt from "jsonwebtoken";
import { generateTokens } from "../utils/tokenManager.js";
import fs from 'fs';
const configuration = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie) throw new Error("No existe el token");

        const { userId } = jwt.verify(refreshTokenCookie, process.env.REFRESH_JWT_SECRET);

        const newToken = generateTokens(userId)
        const now = (new Date()) 
        res.set({'X-Data': newToken.token})
        res.set({'X-Time': now.getTime()+ 1000*configuration.timeToken.timeInSecond})

        req.uid = userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error.message });
    }
};