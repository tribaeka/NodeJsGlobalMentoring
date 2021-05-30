import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken"
import httpStatus from "http-status";
import { HttpError } from "../errors/HttpError";
import UserService  from '../services/userService';

interface IAuthReqBody {
    login: string;
    password: string;
}

const { JWT_SECRET } = process.env;

export async function login(req: Request<unknown, unknown, IAuthReqBody>, res: Response, next: NextFunction): Promise<void> {
    const { login, password } = req.body;
    const user = await UserService.getUserByLogin(login);

    if (user === undefined || user.password !== password || user.isDeleted) {
        next(new HttpError(httpStatus["403_NAME"], httpStatus["403_MESSAGE"], httpStatus.FORBIDDEN));
    } else {
        const payload = { sub: user.id, login: user.login };
        const token = sign(payload, JWT_SECRET as string, { expiresIn: '1m' });
        res.send(token);
    }
}

export function protectedMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['x-access-token'] as string;

    if (token) {
        verify(token, JWT_SECRET as string, (err) => {
            if (err) {
                next(new HttpError(httpStatus["403_NAME"], httpStatus["403_MESSAGE"], httpStatus.FORBIDDEN));
            }
            next();
        })
    } else {
        next(new HttpError(httpStatus["401_NAME"], httpStatus["401_MESSAGE"], httpStatus.UNAUTHORIZED));
    }
}
