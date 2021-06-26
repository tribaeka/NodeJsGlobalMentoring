import { Router } from "express";
import {
    addGroupHandler,
    addUserToGroupHandler,
    getAllGroupsHandler,
    getGroupByIdHandler,
    removeGroupHandler,
    updateGroupHandler
} from "../middewares/groupMiddlewares";

const router: Router = Router();

router.get('/', getAllGroupsHandler);
router.get('/:id', getGroupByIdHandler);
router.post('/:id/user', addUserToGroupHandler);
router.post('/', addGroupHandler);
router.put('/', updateGroupHandler);
router.delete('/:id', removeGroupHandler);

export const groupRouter = router;
