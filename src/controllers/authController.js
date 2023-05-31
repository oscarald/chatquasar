import User from "../models/users.js"
import { generateRefreshToken, generateTokens } from "../utils/tokenManager.js"

const signUp = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body)
        const user = await User.create({ username, password })
        return res.status(201).json({ message: "User created", user })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const bearerHeader = req.headers.authorization;
        console.log(bearerHeader)
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).send({ error: "Ha ocurrido un problema" });
        }
        const comparePassword = await user.verifyPassword(password);
        if (!comparePassword) {
            return res.status(400).send({ error: "Ha ocurrido un problema" });
        }

        const { token, expiresIn } =  generateTokens(user._id);
        generateRefreshToken(user._id, res);

        return res.status(201).json({token, expiresIn})
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const refresh = async (req, res) => {
    try {
        const {token} = req.body;

        return res.status(201).json({ token })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export { signUp, login, refresh }