import jwt from "jsonwebtoken";
import { generateTokens } from "../utils/tokenManager.js";

export const verifyToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        //console.log('token',token)
        if (!token) throw new Error("No Bearer");

        token = token.split(" ")[1];
        
        const {userId}  = jwt.verify(token, process.env.JWT_SECRET);
        const newToken = generateTokens(userId)
        req.uid = userId;
        const now = (new Date()) 
        res.set({'X-Data': newToken.token})
        res.set({'X-Time': now.getTime() + 1000*60*process.env.JWT_EXPIRES_IN_MINUTES})
        //console.log('uid', userId)
        next();
    } catch (error) {
        res.set({'X-Data': null})
        return res.status(401).json({ error: error.message });
    }
};