import { Request, Response, NextFunction } from "express";
import LogService from "../services/logService";

export function logMiddleware(req: Request, res: Response, next: NextFunction): void {
    LogService.logRequestInfo(req);
    next();
}
