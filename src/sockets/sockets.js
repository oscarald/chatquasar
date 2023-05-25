import { Server } from "socket.io";

let io;

const sockets = (server) => {
    io = new Server(server);
    io.on('connection', (socket) => {
        console.log(socket.id)
        socket.on('test', (test) => {
            console.log(test)
        })
        /* socket.on('chat', (chat) => {
            console.log(chat)
            //io.emit('chat', chat)
            socket.broadcast.emit('chat', { name: socket.id, text: chat })
        }) */
    });
}

function getIO() {
    return io;
  }


export { sockets, getIO }