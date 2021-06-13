import { NextFunction, Request, Response } from "express";
import GroupService from '../services/groupService';
import httpStatus from "http-status";
import { IdParam, GroupAttrs, GroupReqAttrs } from "../types";
import { HttpError } from "../errors/HttpError";
import LogService from "../services/logService";
import { METHOD_NAMES } from "../config/loggerConstants";

export async function getAllGroupsHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        res.send(await GroupService.getAllGroups());
    } catch (err) {
        LogService.logRequestError(err.message, METHOD_NAMES.GET_GROUPS, {});
        next(err);
    }
}

export async function getGroupByIdHandler(req: Request<IdParam>, res: Response, next: NextFunction): Promise<void> {
    try {
        const group = await GroupService.getGroupById(req.params.id);

        if (group) {
            res.send(group);
        } else {
            next(new HttpError(httpStatus["404_NAME"], httpStatus["404_MESSAGE"], httpStatus.NOT_FOUND));
        }
    } catch (err) {
        LogService.logRequestError(err.message, METHOD_NAMES.GET_GROUP, { params: req.params });
        next(err);
    }
}

export async function addGroupHandler(
    req: Request<unknown, unknown, GroupReqAttrs>,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const groupId = await GroupService.addGroup(req.body);

        res.status(httpStatus.CREATED).send(groupId.toString());
    } catch (err) {
        LogService.logRequestError(err.message, METHOD_NAMES.ADD_GROUP, { body: req.body });
        next(err);
    }
}

export async function updateGroupHandler(
    req: Request<unknown, unknown, GroupAttrs>,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const group = req.body;
        const isGroupExists = await GroupService.isGroupExists(group.id.toString());

        if (isGroupExists) {
            GroupService.updateGroup(group);
            res.send(group);
        } else {
            next(new HttpError(httpStatus["404_NAME"], httpStatus["404_MESSAGE"], httpStatus.NOT_FOUND));
        }
    } catch (err) {
        LogService.logRequestError(err.message, METHOD_NAMES.UPDATE_GROUPS, { body: req.body });
        next(err);
    }
}

export function removeGroupHandler(req: Request<IdParam>, res: Response, next: NextFunction): void {
    try {
        GroupService.deleteGroup(req.params.id);
        res.end();
    } catch (err) {
        LogService.logRequestError(err.message, METHOD_NAMES.DELETE_GROUPS, { params: req.params });
        next(err);
    }
}

export async function addUserToGroupHandler(
    req: Request<IdParam, unknown, IdParam>,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { id: groupId } = req.params;
        const { id: userId } = req.body;

        GroupService.addUserToGroup(userId, groupId);
        res.end();
    } catch (err) {
        LogService.logRequestError(
            err.message,
            METHOD_NAMES.ADD_USER_TO_GROUP,
            { params: req.params, body: req.body }
        );
        next(err);
    }
}
