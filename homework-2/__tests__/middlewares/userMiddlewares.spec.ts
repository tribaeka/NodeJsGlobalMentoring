import { Request, Response, NextFunction } from "express";
import {
    addUserHandler,
    getAllUsersHandler,
    getAutoSuggestHandler,
    getUserByIdHandler,
    removeUserHandler,
    updateUserHandler
} from '../../middewares/userMiddlewares';
import UserService from './../../services/userService';
import { db } from "../../models";
import { AutoSuggestReqQuery, IdParam, UserAttrs, UserReqAttrs } from "../../types";


describe('User middlewares', () => {
    describe('getAllUsersHandler', () => {
        let mockRequest: Partial<Request>;
        let mockResponse: Partial<Response>;
        const nextFunction: NextFunction = jest.fn();

        beforeEach(() => {
            mockRequest = {};
            mockResponse = {
                send: jest.fn()
            };
        });

        it('it should call getAllUsers method from UserService', async () => {
            const getAllUsersSpy = jest.spyOn(UserService, 'getAllUsers');

            await getAllUsersHandler(mockRequest as Request, mockResponse as Response, nextFunction);
            expect(getAllUsersSpy).toHaveBeenCalled();
        });

        it('should call findAll function from UserModel ', async () => {
            const findAllSpy = jest.spyOn(db.User, 'findAll');

            await getAllUsersHandler(mockRequest as Request, mockResponse as Response, nextFunction);
            expect(findAllSpy).toHaveBeenCalled();
        });

        it('should call send function with correct args', async () => {
            await getAllUsersHandler(mockRequest as Request, mockResponse as Response, nextFunction);
            expect(mockResponse.send).toBeCalledWith(await UserService.getAllUsers());
        })

        it('should call next function in case an error', async () => {
            jest.spyOn(UserService, 'getAllUsers').mockImplementationOnce(() => {
                throw new Error('error');
            });
            await getAllUsersHandler(mockRequest as Request, mockResponse as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled()
        });
    });

    describe('getUserByIdHandler', () => {
        let mockRequest: Partial<Request>;
        let mockResponse: Partial<Response>;
        const nextFunction: NextFunction = jest.fn();
        const existedUserId = '1';
        const notExistedUserId = '999999999999999';

        beforeEach(() => {
            mockRequest = {
                params: {
                    id: existedUserId,
                }
            };
            mockResponse = {
                send: jest.fn()
            };
        });

        it('it should call getUserById method from UserService', async () => {
            const getUserByIdSpy = jest.spyOn(UserService, 'getUserById');

            await getUserByIdHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(getUserByIdSpy).toHaveBeenCalledWith(existedUserId);
        });

        it('should call findByPk function from UserModel ', async () => {
            const findByPkSpy = jest.spyOn(db.User, 'findByPk');

            await getUserByIdHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(findByPkSpy).toHaveBeenCalledWith(existedUserId);
        });

        it('should call send function with correct args', async () => {
            await getUserByIdHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(mockResponse.send).toBeCalledWith(await UserService.getUserById(existedUserId));
        });

        it('should call next function if user does not exists', async () => {
            if (mockRequest.params) {
                mockRequest.params.id = notExistedUserId;
            }

            await getUserByIdHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled()
        });

        it('should call next function in case an error', async () => {
            jest.spyOn(UserService, 'getUserById').mockImplementationOnce(() => {
                throw new Error('error');
            });
            await getUserByIdHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled()
        });
    });

    describe('getAutoSuggestHandler', () => {
        let mockRequest: Partial<Request<unknown, unknown, unknown, AutoSuggestReqQuery>>;
        let mockResponse: Partial<Response>;
        const nextFunction: NextFunction = jest.fn();
        const loginSubstring = 'query';
        const limit = 2;

        beforeEach(() => {
            mockRequest = {
                query: {
                    loginSubstring,
                    limit
                }
            };
            mockResponse = {
                send: jest.fn()
            };
        });

        it('it should call getAutoSuggestUsers method from UserService', async () => {
            const getAutoSuggestUsersSpy = jest.spyOn(UserService, 'getAutoSuggestUsers');

            await getAutoSuggestHandler(mockRequest as Request<unknown, unknown, unknown, AutoSuggestReqQuery>, mockResponse as Response, nextFunction);
            expect(getAutoSuggestUsersSpy).toHaveBeenCalledWith(loginSubstring, limit);
        });

        it('should call send function with correct args', async () => {
            await getAutoSuggestHandler(mockRequest as Request<unknown, unknown, unknown, AutoSuggestReqQuery>, mockResponse as Response, nextFunction);
            expect(mockResponse.send).toBeCalledWith(await UserService.getAutoSuggestUsers(loginSubstring, limit));
        });

        it('should call next function in case an error', async () => {
            jest.spyOn(UserService, 'getAutoSuggestUsers').mockImplementationOnce(() => {
                throw new Error('error');
            });
            await getAutoSuggestHandler(mockRequest as Request<unknown, unknown, unknown, AutoSuggestReqQuery>, mockResponse as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled()
        });
    });

    describe('addUserHandler', () => {
        let mockRequest: Partial<Request<Record<string, unknown>, unknown, UserReqAttrs>>;
        let mockResponse: Partial<Response>;
        const nextFunction: NextFunction = jest.fn();
        const user = {
            login: 'user99',
            password: 'user5',
            age: 18,
            isDeleted: false
        };

        beforeEach(() => {
            mockRequest = {
                body: user
            };
            mockResponse = {
                send: jest.fn()
            };
        });

        it('it should call addUser method from UserService', async () => {
            const addUserSpy = jest.spyOn(UserService, 'addUser');

            await addUserHandler(mockRequest as Request<Record<string, unknown>, unknown, UserReqAttrs>, mockResponse as Response, nextFunction);
            expect(addUserSpy).toHaveBeenCalled();
        });

        it('should call findByPk function from UserModel ', async () => {
            const createSpy = jest.spyOn(db.User, 'create');

            await addUserHandler(mockRequest as Request<Record<string, unknown>, unknown, UserReqAttrs>, mockResponse as Response, nextFunction);
            expect(createSpy).toHaveBeenCalledWith(user);
        });

        it('should call next function in case an error', async () => {
            jest.spyOn(UserService, 'addUser').mockImplementationOnce(() => {
                throw new Error('error');
            });
            await addUserHandler(mockRequest as Request<Record<string, unknown>, unknown, UserReqAttrs>, mockResponse as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled()
        });
    });

    describe('updateUserHandler', () => {
        let mockRequest: Partial<Request<unknown, unknown, UserAttrs>>;
        let mockResponse: Partial<Response>;
        const nextFunction: NextFunction = jest.fn();
        const userWithExistedId = {
            id: 1,
            login: 'user1',
            password: 'user5',
            age: 18,
            isDeleted: false
        };
        const userWithNonExistedId = {
            id: 99999999999,
            login: 'user1',
            password: 'user5',
            age: 18,
            isDeleted: false
        };

        beforeEach(() => {
            mockRequest = {
                body: userWithExistedId
            };
            mockResponse = {
                send: jest.fn()
            };
        });

        it('it should call isUserExists method from UserService', async () => {
            const isUserExistsSpy = jest.spyOn(UserService, 'isUserExists');

            await updateUserHandler(mockRequest as Request<unknown, unknown, UserAttrs>, mockResponse as Response, nextFunction);
            expect(isUserExistsSpy).toHaveBeenCalledWith(userWithExistedId.id.toString());
        });

        it('it should call updateUser method from UserService', async () => {
            const updateUserSpy = jest.spyOn(UserService, 'updateUser');

            await updateUserHandler(mockRequest as Request<unknown, unknown, UserAttrs>, mockResponse as Response, nextFunction);
            expect(updateUserSpy).toHaveBeenCalledWith(userWithExistedId);
        });

        it('should call update function from UserModel ', async () => {
            const updateSpy = jest.spyOn(db.User, 'update');

            await updateUserHandler(mockRequest as Request<unknown, unknown, UserAttrs>, mockResponse as Response, nextFunction);
            expect(updateSpy).toHaveBeenCalledWith(userWithExistedId, { where: { id: userWithExistedId.id }});
        });

        it('should call send function with correct args', async () => {
            await updateUserHandler(mockRequest as Request<unknown, unknown, UserAttrs>, mockResponse as Response, nextFunction);
            expect(mockResponse.send).toHaveBeenCalledWith(userWithExistedId);
        });

        it('should call next function if user is not exists', async () => {
            mockRequest.body = userWithNonExistedId;
            await updateUserHandler(mockRequest as Request<unknown, unknown, UserAttrs>, mockResponse as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled()
        });

        it('should call next function in case an error', async () => {
            jest.spyOn(UserService, 'updateUser').mockImplementationOnce(() => {
                throw new Error('error');
            });
            await updateUserHandler(mockRequest as Request<unknown, unknown, UserAttrs>, mockResponse as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled()
        });
    });

    describe('removeUserHandler', () => {
        let mockRequest: Partial<Request>;
        let mockResponse: Partial<Response>;
        const nextFunction: NextFunction = jest.fn();
        const userId = '1';

        beforeEach(() => {
            mockRequest = {
                params: {
                    id: userId,
                }
            };
            mockResponse = {
                end: jest.fn()
            };
        });

        it('it should call markUserAsDeleted method from UserService', async () => {
            const markUserAsDeletedSpy = jest.spyOn(UserService, 'markUserAsDeleted');

            await removeUserHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(markUserAsDeletedSpy).toHaveBeenCalledWith(userId);
        });

        it('should call findByPk function from UserModel ', async () => {
            const findByPkSpy = jest.spyOn(db.User, 'findByPk');

            await removeUserHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(findByPkSpy).toHaveBeenCalledWith(userId);
        });

        it('should call end function after marking user as deleted', async () => {
            await removeUserHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(mockResponse.end).toHaveBeenCalled();
        });

        it('should call next function in case an error', async () => {
            jest.spyOn(UserService, 'markUserAsDeleted').mockImplementationOnce(() => {
                throw new Error('error');
            });
            await removeUserHandler(mockRequest as Request<IdParam>, mockResponse as Response, nextFunction);
            expect(nextFunction).toHaveBeenCalled()
        });
    });
});
