import { Router } from "express";
import { login, protectedMiddleware } from '../middewares/authMiddlewares';

const router: Router = Router();

router.post('/auth', login);
router.all('/*', protectedMiddleware);

export const authRouter = router;
