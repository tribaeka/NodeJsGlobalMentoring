import { User } from '../interfaces/User';

export const APP_PORT = 3000;
export const DEFAULT_USER_DATA: User[] = [
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
