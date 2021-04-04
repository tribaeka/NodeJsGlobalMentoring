import UserService from "../services/userService";

export function checkUserByLogin(login: string): boolean {
    return UserService.getAllUsers().every(user => user.login !== login);
}

export function checkUserAge(age: number): boolean {
    return age >= 4 && age <=130;
}
