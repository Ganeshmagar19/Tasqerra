import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";
import { successResponse, errorResponse } from "../utils/apiResponse";

export const ListController = {

  // CREATE LIST
  async createList(req: AuthRequest, res: Response) {
    try {
      const { title } = req.body;
      const { boardId } = req.params as { boardId: string };

      if (!title) {
        return errorResponse(res, "Title is required", 400);
      }

      // find last position
      const lastList = await prisma.list.findFirst({
        where: { boardId },
        orderBy: { position: "desc" },
      });

      const position = lastList ? lastList.position + 1 : 1;

      const list = await prisma.list.create({
        data: {
          title,
          boardId,
          position,
        },
      });

      return successResponse(res, "List created", list, 201);

    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to create list");
    }
  },

  // GET LISTS OF BOARD
  async getLists(req: AuthRequest, res: Response) {
    try {
      const { boardId } = req.params as { boardId: string };

      const lists = await prisma.list.findMany({
        where: { boardId },
        orderBy: { position: "asc" },
      });

      return successResponse(res, "Lists fetched", lists);

    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to fetch lists");
    }
  },

  // UPDATE LIST
  async updateList(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const { title } = req.body;

      const list = await prisma.list.update({
        where: { id },
        data: { title },
      });

      return successResponse(res, "List updated", list);

    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to update list");
    }
  },

  // DELETE LIST
  async deleteList(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params as { id: string };

      await prisma.list.delete({
        where: { id },
      });

      return successResponse(res, "List deleted");

    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to delete list");
    }
  },
};
