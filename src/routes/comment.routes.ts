import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// create comment
router.post("/cards/:cardId/comments", authenticate, CommentController.createComment);

// get comments for card
router.get("/cards/:cardId/comments", authenticate, CommentController.getComments);

// delete comment
router.delete("/comments/:id", authenticate, CommentController.deleteComment);

export default router;
