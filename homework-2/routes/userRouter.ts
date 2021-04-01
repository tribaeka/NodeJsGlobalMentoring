import { Router } from 'express';
import {
    addUserHandler,
    getAllUsersHandler,
    getAutoSuggestHandler,
    getUserByIdHandler,
    removeUserHandler,
    updateUserHandler
} from '../middewares/userMiddlewares';
import bodyParser from "body-parser";
import { check } from 'express-validator';
import UserService from '../services/userService';

const PASSWORD_MATH_REGEXP = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

const router: Router = Router();

router.get('/auto-suggest', getAutoSuggestHandler);
router.get('/', getAllUsersHandler);
router.get('/:id', getUserByIdHandler);
router.post(
    '/',
    bodyParser.json(),
    check('login').exists().notEmpty().custom(UserService.validateLogin),
    check('password').exists(),
    check('password').matches(PASSWORD_MATH_REGEXP),
    check('age').exists().isNumeric().custom(UserService.validateAge),
    check('isDeleted').exists(),
    addUserHandler
);
router.put(
    '/',
    bodyParser.json(),
    check('login').exists().notEmpty().custom(UserService.validateLogin),
    check('password').exists(),
    check('password').matches(PASSWORD_MATH_REGEXP),
    check('age').exists().isNumeric().custom(UserService.validateAge),
    check('isDeleted').exists(),
    updateUserHandler
);
router.delete('/:id', removeUserHandler);

export const userRouter = router;


