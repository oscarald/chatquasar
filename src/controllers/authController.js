import User from "../models/users.js"
import { generateRefreshToken, generateTokens } from "../utils/tokenManager.js"
import fs from 'fs';
const configuration = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

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
        console.log(req.body)
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
        //console.log('token', token)
        //res.set({'test': `Bearer ${token}`});
        console.log(configuration)
        const now = (new Date()) 
        res.set({'X-Data': token})
        res.set({'X-Time': now.getTime() + 1000*configuration.timeToken.timeInSecond})

        return res.status(201).json({message: "User logged"})
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const refresh = async (req, res) => {
    try {
        console.log(req.uid)
        //const { token, expiresIn } = generateTokens(req.uid);

        return res.json({msg: 'Token refrescado'});
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
        //console.log(req.headers)
        //req.headers['X-Data'] = 'valor-datos'
        //res.set({'X-Data': 'valor-datos232323'})
        return res.status(200).json({msg: req.headers})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}


export { signUp, login, refresh, test, proting }