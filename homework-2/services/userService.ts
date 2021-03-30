import { User } from "../interfaces/User";
import { DEFAULT_USER_DATA } from "../config/constants";
import { v4 as uuidv4 } from 'uuid';

class UserService {
    private usersList: User[] = DEFAULT_USER_DATA;

    getAllUsers(): User[] {
        return this.usersList;
    }

    getUserById(id: string): User | null {
        return this.usersList.find(user => user.id === id) ?? null;
    }

    addUser(user: User): string {
        user.id = user.id ?? uuidv4();
        this.usersList.push(user);

        return user.id;
    }

    updateUser(user: User) {
        const targetIndex = this.usersList.findIndex(user => user.id === user.id);
        this.usersList[targetIndex] = user;
    }

    isUserExists(userId: string): boolean {
        return !!this.usersList.find(user => user.id === userId);
    }

    markUserAsDeleted(userId: string): void {
        const user = this.getUserById(userId);
        if (user) {
            user.isDeleted = true;
        }
    }

    getAutoSuggestUsers(query: string, limit: number): User[] {
        return this.usersList
            .sort(UserService.loginSubstringCompare)
            .filter(user => user.login.includes(query))
            .slice(0, limit);
    }

    private static loginSubstringCompare(a: User, b: User): number {
        if (a.login < b.login) {
            return  -1;
        }

        if (a.login > b.login) {
            return 1;
        }

        return 0;
    }
}

export default new UserService();