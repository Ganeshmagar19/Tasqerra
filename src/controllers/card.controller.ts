import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";
import { successResponse, errorResponse } from "../utils/apiResponse";

export const CardController = {

  // CREATE CARD
  async createCard(req: AuthRequest, res: Response) {
    try {
      const { title, description } = req.body;
      const { listId } = req.params as { listId: string };

      if (!title) {
        return errorResponse(res, "Title is required", 400);
      }

      const lastCard = await prisma.card.findFirst({
        where: { listId },
        orderBy: { position: "desc" },
      });

      const position = lastCard ? lastCard.position + 1 : 1;

      const card = await prisma.card.create({
        data: {
          title,
          description,
          listId,
          position,
          createdById: req.user!.userId,
        },
      });

      return successResponse(res, "Card created", card, 201);
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to create card");
    }
  },

  // GET CARDS
  async getCards(req: AuthRequest, res: Response) {
    try {
      const { listId } = req.params as { listId: string };

      const cards = await prisma.card.findMany({
        where: { listId },
        orderBy: { position: "asc" },
      });

      return successResponse(res, "Cards fetched", cards);
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to fetch cards");
    }
  },

  // UPDATE CARD
  async updateCard(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const { title, description } = req.body;

      const card = await prisma.card.update({
        where: { id },
        data: { title, description },
      });

      return successResponse(res, "Card updated", card);
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to update card");
    }
  },

  // DELETE CARD
  async deleteCard(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params as { id: string };

      await prisma.card.delete({
        where: { id },
      });

      return successResponse(res, "Card deleted");
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to delete card");
    }
  },

  // MOVE CARD (between lists)
  async moveCard(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const { listId, position } = req.body;

      const card = await prisma.card.update({
        where: { id },
        data: {
          listId,
          position,
        },
      });

      return successResponse(res, "Card moved", card);
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to move card");
    }
  },

  // ASSIGN CARD
  async assignCard(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const { userId } = req.body;

      const card = await prisma.card.update({
        where: { id },
        data: {
          assignedToId: userId,
        },
      });

      return successResponse(res, "Card assigned", card);
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to assign card");
    }
  },
};
