import { NextFunction, Request, Response } from "express";
import { UserAttrs } from "../types";
import UserService from "../services/userService";
import httpStatus from "http-status";
import { DUPLICATE_USER_ERROR } from "../config/constants";

export async function userLoginValidator(
    req: Request<Record<string, unknown>, unknown, UserAttrs>,
    res: Response,
    next: NextFunction
): Promise<void> {
    const existedUser = await UserService.getUserByLogin(req.body.login);

    if (existedUser) {
        res.status(httpStatus.BAD_REQUEST).send({ errors: [DUPLICATE_USER_ERROR]});
    } else {
        next();
    }
}
