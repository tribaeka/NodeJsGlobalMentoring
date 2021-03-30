import { Request, Response} from 'express';
import UserService  from '../services/userService';
import { User } from "../interfaces/User";

interface IdParam {
    id: string;
}

interface AutoSuggestReqQuery {
    query: string;
    limit: number;
}

export function getAllUsers(req: Request, res: Response): void {
    res.send(UserService.getAllUsers());
}

export function getUserById(req: Request<IdParam>, res: Response): void {
    const user = UserService.getUserById(req.params.id);

    if (user) {
        res.send(user);
    } else {
        res.status(404).send('Not found');
    }
}

export function getAutoSuggest(req: Request, res: Response): void {
    console.log(req.query);
    //res.send(UserService.getAutoSuggestUsers(req.query.query, req.query.limit))
    res.status(213).end();
}

export function addUser(req: Request<null, null, User>, res: Response): void {
    const userId = UserService.addUser(req.body);
    res.status(201).send(userId);
}

export function updateUser(req: Request<null, null, User>, res: Response): void {
    const user = req.body;

    if (UserService.isUserExists(user.id)) {
        UserService.updateUser(req.body);
        res.status(204).end();
    } else {
        UserService.addUser(user);
        res.status(201).end();
    }
}

export function removeUser(req: Request<IdParam>, res: Response): void {
    UserService.markUserAsDeleted(req.params.id);
    res.status(200).end();
}
