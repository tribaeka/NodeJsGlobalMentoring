import { NextFunction, Request, Response } from 'express';
import UserService  from '../services/userService';
import { UserAttrs, IdParam } from "../types";
import { validationResult } from "express-validator";
import httpStatus from "http-status";
import { HttpError } from "../errors/HttpError";

interface IAutoSuggestReqQuery {
    loginSubstring: string;
    limit: number;
}

export async function getAllUsersHandler(req: Request, res: Response): Promise<void> {
    res.send(await UserService.getAllUsers());
}

export async function getUserByIdHandler(req: Request<IdParam>, res: Response, next: NextFunction): Promise<void> {
    const user = await UserService.getUserById(req.params.id);

    if (user) {
        res.send(user);
    } else {
        next(new HttpError(httpStatus["404_NAME"], httpStatus["404_MESSAGE"], httpStatus.NOT_FOUND));
    }
}

export async function getAutoSuggestHandler(
    req: Request<unknown, unknown, unknown, IAutoSuggestReqQuery>,
    res: Response
): Promise<void> {
    const autoSuggests = await UserService.getAutoSuggestUsers(req.query.loginSubstring, req.query.limit);
    res.send(autoSuggests);
}

export async function addUserHandler(
    req: Request<Record<string, unknown>, unknown, UserAttrs>,
    res: Response,
    next: NextFunction
): Promise<void> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        next(new HttpError(httpStatus["400_NAME"], errors.array().toString(), httpStatus.BAD_REQUEST));
    } else {
        const userId = await UserService.addUser(req.body);
        res.status(httpStatus.CREATED).send(userId.toString());
    }
}

export async function updateUserHandler(
    req: Request<unknown, unknown, UserAttrs>,
    res: Response,
    next: NextFunction
): Promise<void> {
    const user = req.body;
    const isUserExist = await UserService.isUserExists(user.id.toString());

    if (isUserExist) {
        UserService.updateUser(user);
        res.send(user);
    } else {
        next(new HttpError(httpStatus["404_NAME"], httpStatus["404_MESSAGE"], httpStatus.NOT_FOUND));
    }
}

export function removeUserHandler(req: Request<IdParam>, res: Response): void {
    UserService.markUserAsDeleted(req.params.id);
    res.end();
}
