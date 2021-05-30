import { NextFunction, Request, Response } from "express";
import LogService from "../services/logService";

const SECOND_IN_MS = 1000;
const SECOND_IN_NANO_S = 1e6;

export function executionTimeLogMiddleware(req: Request, res: Response, next: NextFunction): void {
    const startHrTime = process.hrtime();

    res.on("finish", () => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = elapsedHrTime[0] * SECOND_IN_MS + elapsedHrTime[1] / SECOND_IN_NANO_S;

        LogService.logResponseInfo(req, res, elapsedTimeInMs);
    });

    next();
}
