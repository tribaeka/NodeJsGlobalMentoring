import { Router } from 'express';
import {
    addUserHandler,
    getAllUsersHandler,
    getAutoSuggestHandler,
    getUserByIdHandler,
    removeUserHandler,
    updateUserHandler
} from '../middewares/userMiddlewares';
import { check } from 'express-validator';
import { checkUserAge, checkUserByLogin } from "../helpers/userValidators";

const PASSWORD_MATH_REGEXP = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

const router: Router = Router();

router.get('/auto-suggest', getAutoSuggestHandler);
router.get('/', getAllUsersHandler);
router.get('/:id', getUserByIdHandler);
router.post(
    '/',
    check('login').exists().notEmpty().custom(checkUserByLogin),
    check('password').exists(),
    check('password').matches(PASSWORD_MATH_REGEXP),
    check('age').exists().isNumeric().custom(checkUserAge),
    check('isDeleted').exists(),
    addUserHandler
);
router.put(
    '/',
    check('login').exists().notEmpty().custom(checkUserByLogin),
    check('password').exists(),
    check('password').matches(PASSWORD_MATH_REGEXP),
    check('age').exists().isNumeric().custom(checkUserAge),
    check('isDeleted').exists(),
    updateUserHandler
);
router.delete('/:id', removeUserHandler);

export const userRouter = router;


