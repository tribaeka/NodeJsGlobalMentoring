import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
import { createServer } from 'http';
import express, { Application } from 'express';
import { userRouter } from "./routes/userRouter";
import bodyParser from "body-parser";
import { db } from "./models";

db.sequelize
    .authenticate()
    .then(() => console.log("connected to db"))
    .catch(() => {
        throw new Error('Can\' connect to db');
    });
db.sequelize.sync();

const app: Application = express();
const serverInstance = createServer(app);
const { APP_PORT } = process.env;

app.use(bodyParser.json())

app.use('/user', userRouter);

serverInstance.listen(APP_PORT, () => console.log(`App is listening on port ${APP_PORT}!`));
