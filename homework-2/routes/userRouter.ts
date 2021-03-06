import { Router } from 'express';
import {
    addUserHandler,
    getAllUsersHandler,
    getAutoSuggestHandler,
    getUserByIdHandler,
    removeUserHandler,
    updateUserHandler
} from '../middewares/userMiddlewares';
import { userValidator } from "../validators/userValidator";
import { userLoginValidator } from "../validators/userLoginValidator";

const router: Router = Router();

router.get('/auto-suggest', getAutoSuggestHandler);
router.get('/', getAllUsersHandler);
router.get('/:id', getUserByIdHandler);
router.post('/', userValidator, userLoginValidator, addUserHandler);
router.put('/', userValidator, userLoginValidator, updateUserHandler);
router.delete('/:id', removeUserHandler);

export const userRouter = router;

