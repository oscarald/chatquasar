
import jwt from "jsonwebtoken";
import { generateTokens } from "../utils/tokenManager.js";

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie) throw new Error("No existe el token");

        const { userId } = jwt.verify(refreshTokenCookie, process.env.REFRESH_JWT_SECRET);

        const newToken = generateTokens(userId)
        const now = (new Date()) 
        res.set({'X-Data': newToken.token})
        res.set({'X-Time': now.getTime()+ 1000*60*process.env.JWT_EXPIRES_IN_MINUTES})

        req.uid = userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error.message });
    }
};