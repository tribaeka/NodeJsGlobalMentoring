import { Request, Response, NextFunction } from "express";
import {
    addGroupHandler,
    addUserToGroupHandler,
    getAllGroupsHandler,
    getGroupByIdHandler,
    removeGroupHandler,
    updateGroupHandler
} from "../../middewares/groupMiddlewares";
import GroupService from './../../services/groupService';
import { db } from "../../models";
import { IdParam, GroupReqAttrs, Permission, GroupAttrs } from "../../types";

describe('Group middlewares', () => {
    describe('getAllGroupsHandler', () => {
        let mockRequest: Partial<Request>;
        let mockResponse: Partial<Response>;
        const nextFunction: NextFunction = jest.fn();

        beforeEach(() => {
            mockRequest = {};
            mockResponse = {
                send: jest.fn()
            };
        });

        it('it should call getAllGroups method from GroupService', async () => {
            const getAllGroupsSpy = jest.spyOn(GroupService, 'getAllGroups');

            await getAllGroupsHandler(mockRequest as Request, mockResponse as Response, nextFunction);
            expect(getAllGroupsSpy).toHaveBeenCalled();
        });

        it('should call findAll function from GroupModel ', async () => {
            const findAllSpy = jest.spyOn(db.Group, 'findAll');

            await getAllGroupsHandler(mockRequest as Request, mockResponse as Response, nextFunction);
            expect(findAllSpy).toHaveBeenCalled();
        });

        it('should call send function with correct args', async () => {
            await getAllGroupsHandler(mockRequest as Request, mockResponse as Response, nextFunction);
            expect(mockResponse.send).toBeCalledWith(await GroupService.getAllGroups());
        })

        it('should call next function in case an error', async () => {
            jest.spyOn(GroupService, 'getAllGroups').mockImplementationOnce(() => {
                throw new Error('error');
            });
            await getAllGroupsHandler(mockRequest as Request, mockResponse as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled()
        });
    });

    describe('getGroupByIdHandler', () => {
        let mockRequest: Partial<Request>;
        let mockResponse: Partial<Response>;
        const nextFunction: NextFunction = jest.fn();
        const existedGroupId = '3';
        const notExistedGroupId = '999999999999999';

        beforeEach(() => {
            mockRequest = {
                params: {
                    id: existedGroupId,
                }
            };
            mockResponse = {
                send: jest.fn()
            };
        });

        it('it should call getGroupById method from GroupService', async () => {
            const getGroupByIdSpy = jest.spyOn(GroupService, 'getGroupById');

            await getGroupByIdHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(getGroupByIdSpy).toHaveBeenCalledWith(existedGroupId);
        });

        it('should call findByPk function from GroupModel ', async () => {
            const findByPkSpy = jest.spyOn(db.Group, 'findByPk');

            await getGroupByIdHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(findByPkSpy).toHaveBeenCalledWith(existedGroupId);
        });

        it('should call send function with correct args', async () => {
            await getGroupByIdHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            const expectedGroup = await GroupService.getGroupById(existedGroupId);
            expect(mockResponse.send).toBeCalledWith(expectedGroup);
        });

        it('should call next function if group does not exists', async () => {
            if (mockRequest.params) {
                mockRequest.params.id = notExistedGroupId;
            }

            await getGroupByIdHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled()
        });

        it('should call next function in case an error', async () => {
            jest.spyOn(GroupService, 'getGroupById').mockImplementationOnce(() => {
                throw new Error('error');
            });
            await getGroupByIdHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled()
        });
    });

    describe('addGroupHandler', () => {
        let mockRequest: Partial<Request<Record<string, unknown>, unknown, GroupReqAttrs>>;
        let mockResponse: Partial<Response>;
        const nextFunction: NextFunction = jest.fn();
        const group = {
            name: 'group99',
            permissions: [Permission.READ]
        };

        beforeEach(() => {
            mockRequest = {
                body: group
            };
            mockResponse = {
                send: jest.fn()
            };
        });

        it('it should call addGroup method from GroupService', async () => {
            const addGroupSpy = jest.spyOn(GroupService, 'addGroup');

            await addGroupHandler(mockRequest as Request<Record<string, unknown>, unknown, GroupReqAttrs>, mockResponse as Response, nextFunction);
            expect(addGroupSpy).toHaveBeenCalledWith(group);
        });

        it('should call findByPk function from GroupModel ', async () => {
            const createSpy = jest.spyOn(db.Group, 'create');

            await addGroupHandler(mockRequest as Request<Record<string, unknown>, unknown, GroupReqAttrs>, mockResponse as Response, nextFunction);
            expect(createSpy).toHaveBeenCalledWith(group);
        });

        it('should call next function in case an error', async () => {
            jest.spyOn(GroupService, 'addGroup').mockImplementationOnce(() => {
                throw new Error('error');
            });
            await addGroupHandler(mockRequest as Request<Record<string, unknown>, unknown, GroupReqAttrs>, mockResponse as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled()
        });
    });

    describe('updateGroupHandler', () => {
        let mockRequest: Partial<Request<unknown, unknown, GroupAttrs>>;
        let mockResponse: Partial<Response>;
        const nextFunction: NextFunction = jest.fn();
        const groupWithExistedId = {
            id: 3,
            name: 'deletingGroup123',
            permissions: [Permission.READ]
        };
        const groupWithNonExistedId = {
            id: 999,
            name: 'group99',
            permissions: [Permission.READ]
        };

        beforeEach(() => {
            mockRequest = {
                body: groupWithExistedId
            };
            mockResponse = {
                send: jest.fn()
            };
        });

        it('it should call updateGroup method from GroupService', async () => {
            const updateGroupSpy = jest.spyOn(GroupService, 'updateGroup');

            await updateGroupHandler(mockRequest as Request<unknown, unknown, GroupAttrs>, mockResponse as Response, nextFunction);
            expect(updateGroupSpy).toHaveBeenCalledWith(groupWithExistedId);
        });

        it('should call update function from GroupModel ', async () => {
            const updateSpy = jest.spyOn(db.Group, 'update');

            await updateGroupHandler(mockRequest as Request<unknown, unknown, GroupAttrs>, mockResponse as Response, nextFunction);
            expect(updateSpy).toHaveBeenCalledWith(groupWithExistedId, { where: { id: groupWithExistedId.id }});
        });

        it('should call send function with correct args', async () => {
            await updateGroupHandler(mockRequest as Request<unknown, unknown, GroupAttrs>, mockResponse as Response, nextFunction);
            expect(mockResponse.send).toHaveBeenCalledWith(groupWithExistedId);
        });

        it('should call next function if group is not exists', async () => {
            mockRequest.body = groupWithNonExistedId;
            await updateGroupHandler(mockRequest as Request<unknown, unknown, GroupAttrs>, mockResponse as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled()
        });

        it('should call next function in case an error', async () => {
            jest.spyOn(GroupService, 'updateGroup').mockImplementationOnce(() => {
                throw new Error('error');
            });
            await updateGroupHandler(mockRequest as Request<unknown, unknown, GroupAttrs>, mockResponse as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled()
        });
    });

    describe('removeGroupHandler', () => {
        let mockRequest: Partial<Request>;
        let mockResponse: Partial<Response>;
        const nextFunction: NextFunction = jest.fn();
        const groupId = '1';

        beforeEach(() => {
            mockRequest = {
                params: {
                    id: groupId,
                }
            };
            mockResponse = {
                end: jest.fn()
            };
        });

        it('it should call deleteGroup method from GroupService', async () => {
            const deleteGroupSpy = jest.spyOn(GroupService, 'deleteGroup');

            await removeGroupHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(deleteGroupSpy).toHaveBeenCalledWith(groupId);
        });

        it('should call destroy function from GroupModel ', async () => {
            const destroySpy = jest.spyOn(db.Group, 'destroy');

            await removeGroupHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(destroySpy).toHaveBeenCalledWith({ where: { id: groupId } });
        });

        it('should call end function after deleting group', async () => {
            await removeGroupHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(mockResponse.end).toHaveBeenCalled();
        });

        it('should call next function in case an error', async () => {
            jest.spyOn(GroupService, 'deleteGroup').mockImplementationOnce(() => {
                throw new Error('error');
            });
            await removeGroupHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled()
        });
    });

    describe('addUserToGroup', () => {
        let mockRequest: Partial<Request<IdParam, unknown, IdParam>>;
        let mockResponse: Partial<Response>;
        const nextFunction: NextFunction = jest.fn();
        const groupId = '3'
        const userId = '5'

        beforeEach(() => {
            mockRequest = {
                params: {
                    id: groupId,
                },
                body: {
                    id: userId
                }
            };
            mockResponse = {
                end: jest.fn()
            };
        });

        it('it should call addUserToGroup method from GroupService', async () => {
            const addUserToGroupSpy = jest.spyOn(GroupService, 'addUserToGroup');

            await addUserToGroupHandler(mockRequest as Request<IdParam, unknown, IdParam>, mockResponse as Response, nextFunction);
            expect(addUserToGroupSpy).toHaveBeenCalledWith(userId, groupId);
        });

        it('should call end function after deleting group', async () => {
            await addUserToGroupHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(mockResponse.end).toHaveBeenCalled();
        });

        it('should call next function in case an error', async () => {
            jest.spyOn(GroupService, 'addUserToGroup').mockImplementationOnce(() => {
                throw new Error('error');
            });
            await addUserToGroupHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled()
        });
    })
})

