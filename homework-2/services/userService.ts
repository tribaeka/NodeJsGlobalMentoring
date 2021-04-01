import { User } from "../interfaces/User";
import { v4 as uuidv4 } from 'uuid';
import { initialUsersList } from "../config/constants";

export default class UserService {
    private static usersList = initialUsersList;

    static getAllUsers(): User[] {
        return UserService.usersList;
    }

    static getUserById(id: string): User | null {
        return UserService.usersList.find(user => user.id === id) ?? null;
    }

    static addUser(user: User): string {
        user.id = user.id ?? uuidv4();
        UserService.usersList.push(user);

        return user.id;
    }

    static updateUser(user: User): void {
        const targetIndex = UserService.usersList.findIndex(user => user.id === user.id);
        UserService.usersList[targetIndex] = user;
    }

    static isUserExists(userId: string): boolean {
        return !!UserService.usersList.find(user => user.id === userId);
    }

    static markUserAsDeleted(userId: string): void {
        const user = this.getUserById(userId);
        if (user) {
            user.isDeleted = true;
        }
    }

    static getAutoSuggestUsers(loginSubstring: string, limit: number): User[] {
        return UserService.usersList
            .filter(user => user.login.includes(loginSubstring))
            .slice(0, limit);
    }

    static validateLogin(login: string): boolean {
        return UserService.usersList.every(user => user.login !== login);
    }

    static validateAge(age: number): boolean {
        return age >= 4 && age <=130;
    }
}
