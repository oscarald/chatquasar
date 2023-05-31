import express from 'express';
import "dotenv/config";
import "./database/db_connect.js"
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";
import { createServer } from "http";
import { sockets } from './sockets/sockets.js';
import cookieParser from 'cookie-parser';

const app = express();
const server = createServer(app,{
    cors: {
        origin: '*',
        
    },
    
});

app.use(cookieParser());
app.use(
    cors({ 
        credentials: true,
        origin: process.env.URL_ORIGIN,
    }),
    );

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes)


const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Puerto corriendo en : ${port}`));
//app.listen(port, () => console.log(`Puerto corriendo en : ${port}`));

sockets(server);