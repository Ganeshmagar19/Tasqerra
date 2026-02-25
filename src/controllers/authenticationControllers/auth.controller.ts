import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";
import { errorResponse, successResponse } from "../../utils/apiResponse";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const AuthController = {
  // ==========================
  // REGISTER
  // ==========================
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!email || !password) {
        return errorResponse(res, "Email and password required", 400);
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return errorResponse(res, "User already exists", 400);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return successResponse(
        res,
        "User registered successfully",
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        201,
      );
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Internal server error");
    }
  },

  // ==========================
  // LOGIN
  // ==========================
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return errorResponse(res, "Email and password required", 400);
      }

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !user.password) {
        return errorResponse(res, "Invalid credentials", 401);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return errorResponse(res, "Invalid credentials", 401);
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" },
      );

      return successResponse(res, "Login successful", {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Internal server error");
    }
  },
};
