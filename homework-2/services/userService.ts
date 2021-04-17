import { IUserAttrs } from "../interfaces/IUserAttrs";
import { IUserModel } from "../models/userModel";
import { db } from "../models";


class UserService {
    getAllUsers(): Promise<IUserAttrs[]> {
        return db.User.findAll()
    }

    getUserById(id: string): Promise<IUserModel | null> {
        return db.User.findByPk(id);
    }

    async addUser(user: IUserAttrs): Promise<number> {
        const existsByLogin = await db.User.findOne({ where: { login: user.login } })
        if (!existsByLogin) {
            const createdUser = await db.User.create(user);

            return createdUser.id;
        } else {
            throw new Error('Validation error user with this login already exists!')
        }
    }

    updateUser(user: IUserAttrs): void {
        db.User.update(user, { where: { id: user.id }})
    }

    async isUserExists(userId: string): Promise<boolean> {
        const user = await this.getUserById(userId);

        return !!user;
    }

    async markUserAsDeleted(userId: string): Promise<void> {
        const userToDelete = await this.getUserById(userId);

        if (userToDelete && !userToDelete.isDeleted) {
            userToDelete.isDeleted = true;
            userToDelete.save();
        }
    }

    async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<IUserAttrs[]> {
        const users = await this.getAllUsers();

        return users
            .sort(UserService.compareByLogin)
            .filter(user => user.login.includes(loginSubstring))
            .slice(0, limit);
    }

    private static compareByLogin(u1: IUserAttrs, u2: IUserAttrs): number {
        if ( u1.login < u2.login ){
            return -1;
        }

        if ( u1.login > u2.login ){
            return 1;
        }

        return 0;
    }
}

export default new UserService();
