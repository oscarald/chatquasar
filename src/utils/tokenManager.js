import jwt from "jsonwebtoken"
import fs from 'fs';
const configuration = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

const generateTokens = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: configuration.timeToken.timeInSecond });
    
    return { token, expiresIn: configuration.timeToken.timeInSecond };
}


const generateRefreshToken = (userId) => {
    try {
        const refreshToken = jwt.sign({ userId }, process.env.REFRESH_JWT_SECRET, { expiresIn: process.env.REFRESH_JWT_EXPIRES_IN });
        
        return refreshToken;
    } catch (error) {
        console.log(error)
    }
}

export { generateTokens, generateRefreshToken }