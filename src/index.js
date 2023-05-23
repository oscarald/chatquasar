import express from 'express';
import "dotenv/config";
import "./database/db_connect.js"
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes)
io.on('connection', (socket) => {
    console.log(socket.id)
});


const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Puerto corriendo en : ${port}`));
//app.listen(port, () => console.log(`Puerto corriendo en : ${port}`));