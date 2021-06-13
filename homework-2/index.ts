import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
import { createServer } from 'http';
import { db } from "./models";
import LogService from "./services/logService";
import { LOGGING_LEVELS } from "./config/loggerConstants";
import app from "./app";

db.sequelize
    .authenticate()
    .then(() => console.log("connected to db"))
    .catch(() => {
        throw new Error('Can\' connect to db');
    });
db.sequelize.sync();
const serverInstance = createServer(app);
const { APP_PORT } = process.env;

process.on('uncaughtException’', err => LogService.log(LOGGING_LEVELS.ERROR, err.message));
process.on('unhandledRejection’', err => LogService.log(LOGGING_LEVELS.ERROR, err.message));

serverInstance.listen(APP_PORT, () => console.log(`App is listening on port ${APP_PORT}!`));
