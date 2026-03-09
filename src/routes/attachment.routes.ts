import { Router } from "express";
import { AttachmentController } from "../controllers/attachment.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// upload attachment to card
router.post("/cards/:cardId/attachments", authenticate, AttachmentController.uploadAttachment);

// get card attachments
router.get("/cards/:cardId/attachments", authenticate, AttachmentController.getAttachments);

// delete attachment
router.delete("/attachments/:id", authenticate, AttachmentController.deleteAttachment);

export default router;
