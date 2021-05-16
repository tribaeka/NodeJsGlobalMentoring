import { NextFunction, Request, Response } from "express";
import GroupService from '../services/groupService';
import httpStatus from "http-status";
import { IdParam, GroupAttrs } from "../types";
import { HttpError } from "../errors/HttpError";

export async function getAllGroupsHandler(req: Request, res: Response): Promise<void> {
    res.send(await GroupService.getAllGroups());
}

export async function getGroupByIdHandler(req: Request<IdParam>, res: Response, next: NextFunction): Promise<void> {
    const group = await GroupService.getGroupById(req.params.id);

    if (group) {
        res.send(group);
    } else {
        next(new HttpError(httpStatus["404_NAME"], httpStatus["404_MESSAGE"], httpStatus.NOT_FOUND));
    }
}

export async function addGroupHandler(
    req: Request<unknown, unknown, GroupAttrs>,
    res: Response
): Promise<void> {
    const groupId = await GroupService.addGroup(req.body);

    res.status(httpStatus.CREATED).send(groupId.toString());
}

export async function updateGroupHandler(
    req: Request<unknown, unknown, GroupAttrs>,
    res: Response,
    next: NextFunction
): Promise<void> {
    const group = req.body;
    const isGroupExists = await GroupService.isGroupExists(group.id.toString());

    if (isGroupExists) {
        GroupService.updateGroup(group);
        res.send(group);
    } else {
        next(new HttpError(httpStatus["404_NAME"], httpStatus["404_MESSAGE"], httpStatus.NOT_FOUND));
    }
}

export function removeGroupHandler(req: Request<IdParam>, res: Response): void {
    GroupService.deleteGroup(req.params.id);
    res.end();
}

export async function addUserToGroup(
    req: Request<IdParam, unknown, IdParam>,
    res: Response
): Promise<void> {
    const { id: groupId } = req.params;
    const { id: userId } = req.body;
    GroupService.addUserToGroup(userId, groupId);
    res.end();
}
