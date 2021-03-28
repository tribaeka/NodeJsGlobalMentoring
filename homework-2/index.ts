import express, { Application } from 'express';
import { userRouter } from "./routes/userRouter";
import { APP_PORT } from "./config/constants";

const app: Application = express();

app.use('/', userRouter);

app.listen(APP_PORT, () => console.log(`App is listening on port ${APP_PORT}!`));
