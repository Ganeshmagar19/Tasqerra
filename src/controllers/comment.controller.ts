import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";
import { successResponse, errorResponse } from "../utils/apiResponse";

export const CommentController = {

  // CREATE COMMENT
  async createComment(req: AuthRequest, res: Response) {
    try {
      const { content } = req.body;
      const { cardId } = req.params as { cardId: string };

      if (!content) {
        return errorResponse(res, "Comment content required", 400);
      }

      const comment = await prisma.comment.create({
        data: {
          content,
          cardId,
          userId: req.user!.userId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
      });

      return successResponse(res, "Comment created", comment, 201);

    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to create comment");
    }
  },

  // GET COMMENTS
  async getComments(req: AuthRequest, res: Response) {
    try {
      const { cardId } = req.params as { cardId: string };

      const comments = await prisma.comment.findMany({
        where: { cardId },
        orderBy: { createdAt: "asc" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
      });

      return successResponse(res, "Comments fetched", comments);

    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to fetch comments");
    }
  },

  // DELETE COMMENT
  async deleteComment(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params as { id: string };

      await prisma.comment.delete({
        where: { id },
      });

      return successResponse(res, "Comment deleted");

    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to delete comment");
    }
  },
};
