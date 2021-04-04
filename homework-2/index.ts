import { createServer } from 'http';
import express, { Application } from 'express';
import { userRouter } from "./routes/userRouter";
import { APP_PORT } from "./config/constants";
import bodyParser from "body-parser";

const app: Application = express();
const serverInstance = createServer(app);

app.use(bodyParser.json())

app.use('/user', userRouter);

serverInstance.listen(APP_PORT, () => console.log(`App is listening on port ${APP_PORT}!`));
