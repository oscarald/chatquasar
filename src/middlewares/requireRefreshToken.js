
import jwt from "jsonwebtoken";

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie) throw new Error("No existe el token");

        const { uid } = jwt.verify(refreshTokenCookie, process.env.REFRESH_JWT_SECRET);

        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error.message });
    }
};