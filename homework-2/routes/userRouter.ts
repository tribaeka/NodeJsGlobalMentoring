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

router.get('/auto-suggest', getAutoSuggest);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', bodyParser.json(), addUser);
router.put('/', bodyParser.json(), updateUser);
router.delete('/:id', removeUser);

export const userRouter = router;


