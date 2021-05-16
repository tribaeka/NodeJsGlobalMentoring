import { NextFunction, Request, Response } from "express";
import LogService from "../services/logService";

export function executionTimeLogMiddleware(req: Request, res: Response, next: NextFunction): void {
    const startHrTime = process.hrtime();

    res.on("finish", () => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

        LogService.logResponseInfo(req, res, elapsedTimeInMs);
    });

    next();
}
