import { createLogger, format, transports } from 'winston';
import { LOGGER_DEFAULT_FIELDS, LOGGING_LEVELS, LOGGING_MESSAGES } from "../config/loggerConstants";
import { Request, Response } from "express";

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
            query,
            ...LOGGER_DEFAULT_FIELDS
        });
    }

    logResponseInfo(req: Request, res: Response, executionTime: number): void {
        const { method, path, query } = req;
        const { status } = res;

        this.logger.log({
            level: LOGGING_LEVELS.INFO,
            message: LOGGING_MESSAGES.COMMON_RESPONSE_MESSAGE,
            method,
            path,
            query,
            status,
            executionTime: `${executionTime} ms`,
            ...LOGGER_DEFAULT_FIELDS
        });
    }

    logRequestError(message: string, methodName: string, args: unknown): void {
        this.logger.log({
            level: LOGGING_LEVELS.ERROR,
            message,
            methodName,
            args,
            ...LOGGER_DEFAULT_FIELDS
        });
    }
}

export default new LogService();
