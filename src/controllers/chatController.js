import User from "../models/users.js"

import { getIO } from "../sockets/sockets.js";


const chat = (req, res) => {
    const io = getIO();
    io.emit('chat', {
        name: 'jefe',
        text: 'otro'
    })
    res.status(200).send("Chat Controller");
}


const message = async (req, res) => {
    try {
        const io = getIO();
        const { message, id } = req.body;
        const user = await User.findById(id);
        io.emit('chat', {
            id:user._id,
            name: user.username,
            text: message
        })
        io.emit('test',{
            id:user._id,
            name: 'Jefazo',
            text: 'Mensaje de prueba'
        })
        return res.status(201).json({ user })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}



export { chat, message }