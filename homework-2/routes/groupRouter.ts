import { Router } from "express";
import {
    addGroupHandler,
    addUserToGroup,
    getAllGroupsHandler,
    getGroupByIdHandler,
    removeGroupHandler,
    updateGroupHandler
} from "../middewares/groupMiddlewares";

const router: Router = Router();

router.get('/', getAllGroupsHandler);
router.get('/:id', getGroupByIdHandler);
router.post('/:id/user', addUserToGroup);
router.post('/', addGroupHandler);
router.put('/', updateGroupHandler);
router.delete('/:id', removeGroupHandler);

export const groupRouter = router;
