import { NextFunction, Request, Response } from "express";
import { HttpError } from "../types/HttpError";
import httpStatus from "http-status";

export function errorHandler(err: HttpError, req: Request, res: Response, next: NextFunction): void {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
}
