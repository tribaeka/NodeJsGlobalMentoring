export type UserAttrs = {
    id: number;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
