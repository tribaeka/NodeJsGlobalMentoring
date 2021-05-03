import { Request, Response } from 'express';
import UserService  from '../services/userService';
import { UserAttrs } from "../types";
import { validationResult } from "express-validator";
import httpStatus from "http-status";
import { IdParam } from "../types/IdParam";

interface IAutoSuggestReqQuery {
    loginSubstring: string;
    limit: number;
}

export async function getAllUsersHandler(req: Request, res: Response): Promise<void> {
    res.send(await UserService.getAllUsers());
}

export async function getUserByIdHandler(req: Request<IdParam>, res: Response): Promise<void> {
    const user = await UserService.getUserById(req.params.id);

    if (user) {
        res.send(user);
    } else {
        res.sendStatus(httpStatus.NOT_FOUND);
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
    res: Response
): Promise<void> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(httpStatus.BAD_REQUEST).send({ errors: errors.array() });
    } else {
        const userId = await UserService.addUser(req.body);
        res.status(httpStatus.CREATED).send(userId.toString());
    }
}

export async function updateUserHandler(
    req: Request<unknown, unknown, UserAttrs>,
    res: Response
): Promise<void> {
    const user = req.body;
    const isUserExist = await UserService.isUserExists(user.id.toString());

    if (isUserExist) {
        UserService.updateUser(user);
        res.send(user);
    } else {
        res.sendStatus(httpStatus.NOT_FOUND);
    }
}

export function removeUserHandler(req: Request<IdParam>, res: Response): void {
    UserService.markUserAsDeleted(req.params.id);
    res.end();
}
