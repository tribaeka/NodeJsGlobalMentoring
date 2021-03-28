import { Router } from 'express';
import {
    addUser,
    getAllUsers,
    getAutoSuggest,
    getUserById,
    removeUser,
    updateUser
} from '../middewares/userMiddlewares';
import bodyParser from "body-parser";

const router: Router = Router();

router.get('/user', getAllUsers);
router.get('/user/:id', getUserById);
router.get('/user/autoSuggest', getAutoSuggest);
router.post('/user', bodyParser.json(), addUser);
router.put('/user', bodyParser.json(), updateUser);
router.delete('/user/:id', removeUser);

export const userRouter = router;


