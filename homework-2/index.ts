import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
import { createServer } from 'http';
import express, { Application } from 'express';
import { groupRouter, userRouter } from "./routes";
import bodyParser from "body-parser";
import { db } from "./models";
import { logMiddleware } from "./middewares/logMiddleware";

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

app.use(logMiddleware);
app.use('/user', userRouter);
app.use('/group', groupRouter);

serverInstance.listen(APP_PORT, () => console.log(`App is listening on port ${APP_PORT}!`));
