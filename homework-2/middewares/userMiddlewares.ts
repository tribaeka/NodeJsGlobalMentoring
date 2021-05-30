import { NextFunction, Request, Response } from 'express';
import UserService  from '../services/userService';
import { UserAttrs, IdParam } from "../types";
import { validationResult } from "express-validator";
import httpStatus from "http-status";
import { HttpError } from "../errors/HttpError";
import LogService from "../services/logService";
import { METHOD_NAMES } from "../config/loggerConstants";

interface IAutoSuggestReqQuery {
    loginSubstring: string;
    limit: number;
}

export async function getAllUsersHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        res.send(await UserService.getAllUsers());
    } catch (err) {
        LogService.logRequestError(err.message, METHOD_NAMES.GET_USERS, {});
        next(err);
    }
}

export async function getUserByIdHandler(req: Request<IdParam>, res: Response, next: NextFunction): Promise<void> {
    try {
        const user = await UserService.getUserById(req.params.id);

        if (user) {
            res.send(user);
        } else {
            next(new HttpError(httpStatus["404_NAME"], httpStatus["404_MESSAGE"], httpStatus.NOT_FOUND));
        }
    } catch (err) {
        LogService.logRequestError(err.message, METHOD_NAMES.GET_USER, { params: req.params });
        next(err);
    }

}

export async function getAutoSuggestHandler(
    req: Request<unknown, unknown, unknown, IAutoSuggestReqQuery>,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const autoSuggests = await UserService.getAutoSuggestUsers(req.query.loginSubstring, req.query.limit);
        res.send(autoSuggests);
    } catch (err) {
        LogService.logRequestError(err.message, METHOD_NAMES.USER_AUTO_SUGGEST, { query: req.query });
        next(err);
    }
}

export async function addUserHandler(
    req: Request<Record<string, unknown>, unknown, UserAttrs>,
    res: Response,
    next: NextFunction
): Promise<void> {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            next(new HttpError(httpStatus["400_NAME"], errors.array().toString(), httpStatus.BAD_REQUEST));
        } else {
            const userId = await UserService.addUser(req.body);
            res.status(httpStatus.CREATED).send(userId.toString());
        }
    } catch (err) {
        LogService.logRequestError(err.message, METHOD_NAMES.ADD_USER, { body: req.body });
        next(err);
    }
}

export async function updateUserHandler(
    req: Request<unknown, unknown, UserAttrs>,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const user = req.body;
        const isUserExist = await UserService.isUserExists(user.id.toString());

        if (isUserExist) {
            UserService.updateUser(user);
            res.send(user);
        } else {
            next(new HttpError(httpStatus["404_NAME"], httpStatus["404_MESSAGE"], httpStatus.NOT_FOUND));
        }
    } catch (err) {
        LogService.logRequestError(err.message, METHOD_NAMES.UPDATE_USER, { body: req.body });
        next(err);
    }

}

export function removeUserHandler(req: Request<IdParam>, res: Response, next: NextFunction): void {
    try {
        UserService.markUserAsDeleted(req.params.id);
        res.end();
    } catch (err) {
        LogService.logRequestError(err.message, METHOD_NAMES.DELETE_USER, { params: req.params});
        next(err);
    }
}
