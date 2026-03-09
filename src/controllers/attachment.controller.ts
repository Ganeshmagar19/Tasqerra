import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";
import { successResponse, errorResponse } from "../utils/apiResponse";

export const AttachmentController = {

  // UPLOAD ATTACHMENT
  async uploadAttachment(req: AuthRequest, res: Response) {
    try {
      const { cardId } = req.params as { cardId: string };
      const { fileName, fileUrl, fileType, fileSize } = req.body;

      if (!fileUrl) {
        return errorResponse(res, "File URL is required", 400);
      }

      const attachment = await prisma.attachment.create({
        data: {
          fileName,
          fileUrl,
          fileType,
          fileSize,
          cardId,
          uploadedById: req.user!.userId,
        },
      });

      return successResponse(res, "Attachment uploaded", attachment, 201);
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to upload attachment");
    }
  },

  // GET ATTACHMENTS OF CARD
  async getAttachments(req: AuthRequest, res: Response) {
    try {
      const { cardId } = req.params as { cardId: string };

      const attachments = await prisma.attachment.findMany({
        where: { cardId },
        orderBy: { createdAt: "desc" },
      });

      return successResponse(res, "Attachments fetched", attachments);
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to fetch attachments");
    }
  },

  // DELETE ATTACHMENT
  async deleteAttachment(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params as { id: string };

      await prisma.attachment.delete({
        where: { id },
      });

      return successResponse(res, "Attachment deleted");
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to delete attachment");
    }
  },
};
