import { Response } from "express";
import { prisma } from "../config/prisma";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { AuthRequest } from "../middlewares/auth.middleware";

export const BoardController = {

  // CREATE BOARD
  async createBoard(req: AuthRequest, res: Response) {
    try {
      const { title, description } = req.body;

      if (!title) {
        return errorResponse(res, "Title is required", 400);
      }

      const board = await prisma.board.create({
        data: {
          title,
          description,
          ownerId: req.user!.userId,
        },
      });

      return successResponse(res, "Board created", board, 201);
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to create board");
    }
  },

  // GET ALL BOARDS
  async getBoards(req: AuthRequest, res: Response) {
    try {
      const boards = await prisma.board.findMany({
        where: {
          ownerId: req.user!.userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return successResponse(res, "Boards fetched", boards);
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to fetch boards");
    }
  },

  // GET SINGLE BOARD
  async getBoard(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id as string;

      const board = await prisma.board.findFirst({
        where: {
          id,
          ownerId: req.user!.userId,
        },
      });

      if (!board) {
        return errorResponse(res, "Board not found", 404);
      }

      return successResponse(res, "Board fetched", board);
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to fetch board");
    }
  },

  // UPDATE BOARD
  async updateBoard(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id as string;
      const { title, description } = req.body;

      const board = await prisma.board.updateMany({
        where: {
          id,
          ownerId: req.user!.userId,
        },
        data: {
          title,
          description,
        },
      });

      if (board.count === 0) {
        return errorResponse(res, "Board not found", 404);
      }

      return successResponse(res, "Board updated");
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to update board");
    }
  },

  // DELETE BOARD
  async deleteBoard(req: AuthRequest, res: Response) {
    try {
      const id = req.params.id as string;

      const board = await prisma.board.deleteMany({
        where: {
          id,
          ownerId: req.user!.userId,
        },
      });

      if (board.count === 0) {
        return errorResponse(res, "Board not found", 404);
      }

      return successResponse(res, "Board deleted");
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Failed to delete board");
    }
  },
};
