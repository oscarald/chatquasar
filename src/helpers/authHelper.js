import jwt from 'jsonwebtoken';
import fs from 'fs';
const configuration = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

const generateTokens = async (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: configuration.timeToken.timeInSecond });
    const refresh = jwt.sign({ userId }, process.env.REFRESH_JWT_SECRET, { expiresIn: configuration.timeRefreshToken.timeInSecond });
    return { token, refresh };
}

const refreshTokens = async (req) => {
try {
    const {token, refreshtoken, username} = req.body;
    if (!token || !refreshtoken) {
        return { error: 'No se encontraron los tokens' };
    }

    const  idToken  = jwt.verify(token, process.env.JWT_SECRET);
    const idRefresh = jwt.verify(refreshtoken, process.env.REFRESH_JWT_SECRET);
    if (idToken.userId !== idRefresh.userId) {
        return { error: 'Tokens no coinciden' };
    }
    const userId = idToken.userId;
    const newToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: configuration.timeToken.timeInSecond });

    return { token:newToken, refreshtoken, username, error: null };
} catch (error) {
    return { error: "error" };
}
}



export { generateTokens, refreshTokens,  }
