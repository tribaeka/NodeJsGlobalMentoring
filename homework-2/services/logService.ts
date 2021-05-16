import { createLogger, format, transports } from 'winston';
import { LOGGER_DEFAULT_FIELDS, LOGGING_LEVELS, LOGGING_MESSAGES } from "../config/loggerConstants";
import { Request } from "express";

class LogService {
    private logger;

    constructor() {
        this.logger = createLogger({
            level: 'http',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.json()
            ),
            defaultMeta: { service: 'user-groups-api' },
            transports: [ new transports.Console() ]
        });
    }

    log(level: string, message: string): void {
        this.logger.log({
            level,
            message,
            ...LOGGER_DEFAULT_FIELDS
        });
    }

    logRequestInfo(req: Request): void {
        const { method, path, query } = req;
        this.logger.log({
            level: LOGGING_LEVELS.INFO,
            message: LOGGING_MESSAGES.COMMON_REQUEST_INFO,
            method,
            path,
            query
        });
    }
}

export default new LogService();
