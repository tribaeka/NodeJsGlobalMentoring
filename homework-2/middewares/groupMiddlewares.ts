import { Request, Response } from "express";
import GroupService from '../services/groupService';
import httpStatus from "http-status";
import { IdParam, GroupAttrs } from "../types";

interface IAddUserToGroupReQuery {
    userId: string;
    groupId: string;
}

export async function getAllGroupsHandler(req: Request, res: Response): Promise<void> {
    res.send(await GroupService.getAllGroups());
}

export async function getGroupByIdHandler(req: Request<IdParam>, res: Response): Promise<void> {
    const group = await GroupService.getGroupById(req.params.id);

    if (group) {
        res.send(group);
    } else {
        res.sendStatus(httpStatus.NOT_FOUND);
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
    res: Response
): Promise<void> {
    const group = req.body;
    const isGroupExists = await GroupService.isGroupExists(group.id.toString());

    if (isGroupExists) {
        GroupService.updateGroup(group);
        res.send(group);
    } else {
        res.sendStatus(httpStatus.NOT_FOUND);
    }
}

export function removeGroupHandler(req: Request<IdParam>, res: Response): void {
    GroupService.deleteGroup(req.params.id);
    res.end();
}

export async function addUserToGroup(
    req: Request<unknown, unknown, unknown, IAddUserToGroupReQuery>,
    res: Response
): Promise<void> {
    const { userId, groupId } = req.query;
    GroupService.addUserToGroup(userId, groupId);
    res.end();
}
