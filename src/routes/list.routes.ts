import { Router } from "express";
import { ListController } from "../controllers/list.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// create list in board
router.post("/boards/:boardId/lists", authenticate, ListController.createList);

// get lists of a board
router.get("/boards/:boardId/lists", authenticate, ListController.getLists);

// update list
router.patch("/lists/:id", authenticate, ListController.updateList);

// delete list
router.delete("/lists/:id", authenticate, ListController.deleteList);

export default router;