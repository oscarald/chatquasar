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
        //const bearerHeader = req.headers.authorization;
        //console.log(bearerHeader)
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).send({ error: "Ha ocurrido un problema" });
        }
        const comparePassword = await user.verifyPassword(password);
        if (!comparePassword) {
            return res.status(400).send({ error: "Ha ocurrido un problema" });
        }

        const { token, expiresIn } =  generateTokens(user._id);
        const refreshToken = generateRefreshToken(user._id);
        console.log('refreshToken', refreshToken)
        res.cookie('refreshToken', refreshToken, 
        {
            httpOnly: true,
            secure: process.env.MODE === 'dev' ? false : true,
            sameSite: process.env.MODE === 'dev' ? 'lax' : 'none',
        }
        );

        return res.status(201).json({token, expiresIn})
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const refresh = async (req, res) => {
    try {
        const { token, expiresIn } = generateTokens(req.uid);

        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

const test = (req,res) =>{
    try {
        const datos = req.body
        console.log(datos)
        res.cookie('test', datos,
        {
            httpOnly: true,
            
        }
        )
        return res.status(200).json({msg: "Bienvenido a la API"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const proting = (req,res) =>{
    try {
        
        return res.status(200).json({msg: "Bienvenido a la API"})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

export { signUp, login, refresh, test, proting }