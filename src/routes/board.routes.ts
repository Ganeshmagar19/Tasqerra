import { Router } from "express";
import { BoardController } from "../controllers/board.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticate, BoardController.createBoard);
router.get("/", authenticate, BoardController.getBoards);
router.get("/:id", authenticate, BoardController.getBoard);
router.patch("/:id", authenticate, BoardController.updateBoard);
router.delete("/:id", authenticate, BoardController.deleteBoard);

export default router;
