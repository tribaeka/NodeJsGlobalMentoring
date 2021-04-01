import { Request, Response} from 'express';
import UserService  from '../services/userService';
import { User } from "../interfaces/User";
import { RES_MESSAGES, RES_STATUS_CODES } from "../config/constants";
import { validationResult } from "express-validator";

interface IdParam {
    id: string;
}

interface AutoSuggestReqQuery {
    loginSubstring: string;
    limit: number;
}

export function getAllUsersHandler(req: Request, res: Response): void {
    res.send(UserService.getAllUsers());
}

export function getUserByIdHandler(req: Request<IdParam>, res: Response): void {
    const user = UserService.getUserById(req.params.id);

    if (user) {
        res.send(user);
    } else {
        res.status(RES_STATUS_CODES.NOT_FOUND).send(RES_MESSAGES.NOT_FOUND);
    }
}

export function getAutoSuggestHandler(req: Request<unknown, unknown, unknown, AutoSuggestReqQuery>, res: Response): void {
    const autoSuggests = UserService.getAutoSuggestUsers(req.query.loginSubstring, req.query.limit);
    res.send(autoSuggests);
}

export function addUserHandler(req: Request<Record<string, unknown>, unknown, User>, res: Response): void {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(RES_STATUS_CODES.BAD_REQUEST).send({ errors: errors.array() });
    } else {
        const userId = UserService.addUser(req.body);
        res.status(RES_STATUS_CODES.CREATED).send(userId);
    }
}

export function updateUserHandler(req: Request<unknown, unknown, User>, res: Response): void {
    const user = req.body;

    if (UserService.isUserExists(user.id)) {
        UserService.updateUser(req.body);
        res.status(RES_STATUS_CODES.NO_CONTENT).end();
    } else {
        UserService.addUser(user);
        res.status(RES_STATUS_CODES.CREATED).end();
    }
}

export function removeUserHandler(req: Request<IdParam>, res: Response): void {
    UserService.markUserAsDeleted(req.params.id);
    res.end();
}
