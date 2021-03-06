import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
import { createServer } from 'http';
import express, { Application } from 'express';
import cors from "cors";
import { authRouter, groupRouter, userRouter } from "./routes";
import bodyParser from "body-parser";
import { db } from "./models";
import { initialLogMiddleware } from "./middewares/initialLogMiddleware";
import { errorHandler } from "./middewares/errorMiddleware";
import LogService from "./services/logService";
import { LOGGING_LEVELS } from "./config/loggerConstants";
import { executionTimeLogMiddleware } from "./middewares/executionTimeLogMiddleware";

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
const corsOptions = {
    origin: `http://localhost:${APP_PORT}`,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(initialLogMiddleware);
app.use(executionTimeLogMiddleware);

app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/group', groupRouter);

app.use(errorHandler);

process.on('uncaughtExceptionâ€™', err => LogService.log(LOGGING_LEVELS.ERROR, err.message));
process.on('unhandledRejectionâ€™', err => LogService.log(LOGGING_LEVELS.ERROR, err.message));


serverInstance.listen(APP_PORT, () => console.log(`App is listening on port ${APP_PORT}!`));
