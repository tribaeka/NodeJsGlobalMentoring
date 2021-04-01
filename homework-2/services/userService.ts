import { User } from "../interfaces/User";
import { v4 as uuidv4 } from 'uuid';

export const defaultUsersList: User[] = [
    {
        id: '14f4e1a1-ff87-4f93-b01f-2293f82f1345',
        login: 'user1query',
        password: 'user1',
        age: 1,
        isDeleted: false
    },
    {
        id: 'cbe11495-1dc1-489b-9a1b-5d215e6501a9',
        login: 'user2query',
        password: 'user2',
        age: 2,
        isDeleted: false
    },
    {
        id: 'fe1ed5a7-7c47-41fe-9248-f776bd706b18',
        login: 'user3query',
        password: 'user3',
        age: 3,
        isDeleted: false
    },
    {
        id: '4b4ba4ab-0f8c-4669-9aef-0bcf220dad8e',
        login: 'user4',
        password: 'user4',
        age: 4,
        isDeleted: false
    }
];

export default class UserService {
    private static usersList = defaultUsersList;

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
