import { UserAttrs } from "../types";
import { db } from "../models";


class UserService {
    async getAllUsers(): Promise<UserAttrs[]> {
        const usersModels = await db.User.findAll();

        return <UserAttrs[]>usersModels.map(usersModel => usersModel.toJSON())
    }

    async getUserById(id: string): Promise<UserAttrs | undefined> {
        const userModel = await db.User.findByPk(id);

        return <UserAttrs>userModel?.toJSON();
    }

    async getUserByLogin(login: string): Promise<UserAttrs | undefined> {
        const userModel = await db.User.findOne({ where: { login } });

        return <UserAttrs>userModel?.toJSON();
    }

    async getAuthenticatedUser(login: string, password: string): Promise<UserAttrs | undefined> {
        const userModel = await db.User.findOne({ where: { login, password, isDeleted: false } });

        return <UserAttrs>userModel?.toJSON();
    }

    async addUser(user: UserAttrs): Promise<number> {
        const createdUser = await db.User.create(user);

        return createdUser.id;
    }

    updateUser(user: UserAttrs): void {
        db.User.update(user, { where: { id: user.id }})
    }

    async isUserExists(userId: string): Promise<boolean> {
        const user = await this.getUserById(userId);

        return !!user;
    }

    async markUserAsDeleted(userId: string): Promise<void> {
        const userToDelete = await db.User.findByPk(userId);

        if (userToDelete && !userToDelete.isDeleted) {
            userToDelete.isDeleted = true;
            userToDelete.save();
        }
    }

    async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<UserAttrs[]> {
        const users = await this.getAllUsers();

        return users
            .sort((u1: UserAttrs, u2: UserAttrs) => u1.login.localeCompare(u2.login))
            .filter(user => user.login.includes(loginSubstring))
            .slice(0, limit);
    }
}

export default new UserService();
