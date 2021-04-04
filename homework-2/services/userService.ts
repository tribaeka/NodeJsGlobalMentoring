import { IUser } from "../interfaces/IUser";
import { v4 as uuidv4 } from 'uuid';

const initialUsersList: IUser[] = [
    {
        id: '14f4e1a1-ff87-4f93-b01f-2293f82f1345',
        login: 'user1query1',
        password: 'user1',
        age: 1,
        isDeleted: false
    },
    {
        id: 'cbe11495-1dc1-489b-9a1b-5d215e6501a9',
        login: 'user2query12123123123',
        password: 'user2',
        age: 2,
        isDeleted: false
    },
    {
        id: 'fe1ed5a7-7c47-41fe-9248-f776bd706b18',
        login: 'user3query123',
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

class UserService {
    private usersList: IUser[];

    constructor() {
        this.usersList = initialUsersList;
    }

    getAllUsers(): IUser[] {
        return this.usersList;
    }

    getUserById(id: string): IUser | null {
        return this.usersList.find(user => user.id === id) || null;
    }

    addUser(user: IUser): string {
        user.id = user.id || uuidv4();
        this.usersList.push(user);

        return user.id;
    }

    updateUser(user: IUser): void {
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

    getAutoSuggestUsers(loginSubstring: string, limit: number): IUser[] {
        return this.usersList
            .sort(this.compareByLogin)
            .filter(user => user.login.includes(loginSubstring))
            .slice(0, limit);
    }

    private compareByLogin(u1: IUser, u2: IUser): number {
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
