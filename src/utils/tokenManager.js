import jwt from "jsonwebtoken"

const generateTokens = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    
    return { token, expiresIn: process.env.JWT_EXPIRES_IN };
}

const generateRefreshToken = (userId, res) => {
    try {
        const refreshToken = jwt.sign({ userId }, process.env.REFRESH_JWT_SECRET, { expiresIn: process.env.REFRESH_JWT_EXPIRES_IN });
        res.cookie('refreshToken', refreshToken, 
        { 
            //httpOnly: true, 
            expire: new Date(Date.now() + process.env.REFRESH_JWT_EXPIRES_IN * 1000),
            secure: false,
            sameSite: 'none'
        }
        );
    } catch (error) {
        console.log(error)
    }
}

export { generateTokens, generateRefreshToken }