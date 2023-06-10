import express from 'express';
import "dotenv/config";
import "./database/db_connect.js"
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";
import { createServer } from "http";
import { sockets } from './sockets/sockets.js';
import cookieParser from 'cookie-parser';
import { initialConfig } from './helpers/initialConfig.js';



const app = express();
const server = createServer(app,{
    cors: {
        origin: '*',
    },
});

app.use(cookieParser());
app.use(
    cors({ 
        origin: process.env.URL_ORIGIN,
        credentials: true,
        exposedHeaders: ['X-Data', 'X-Time']
    }),
    );

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initialConfig()

app.use('/', routes)

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Puerto corriendo en : ${port}`));
//app.listen(port, () => console.log(`Puerto corriendo en : ${port}`));

sockets(server);