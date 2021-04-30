import { IUserAttrs } from "../interfaces";
import { db } from "../models";


class UserService {
    async getAllUsers(): Promise<IUserAttrs[]> {
        const usersModels = await db.User.findAll();

        return <IUserAttrs[]>usersModels.map(usersModel => usersModel.toJSON())
    }

    async getUserById(id: string): Promise<IUserAttrs | undefined> {
        const userModel = await db.User.findByPk(id);

        return <IUserAttrs>userModel?.toJSON();
    }

    async getUserByLogin(login: string): Promise<IUserAttrs | undefined> {
        const userModel = await db.User.findOne({ where: { login } });

        return <IUserAttrs>userModel?.toJSON();
    }

    async addUser(user: IUserAttrs): Promise<number> {
        const createdUser = await db.User.create(user);

        return createdUser.id;
    }

    updateUser(user: IUserAttrs): void {
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

    async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<IUserAttrs[]> {
        const users = await this.getAllUsers();

        return users
            .sort((u1: IUserAttrs, u2: IUserAttrs) => u1.login.localeCompare(u2.login))
            .filter(user => user.login.includes(loginSubstring))
            .slice(0, limit);
    }
}

export default new UserService();
