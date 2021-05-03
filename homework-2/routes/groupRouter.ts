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

router.get('/add-user-to-group', addUserToGroup);
router.get('/', getAllGroupsHandler);
router.get('/:id', getGroupByIdHandler);
router.post('/', addGroupHandler);
router.put('/', updateGroupHandler);
router.delete('/:id', removeGroupHandler);

export const groupRouter = router;
