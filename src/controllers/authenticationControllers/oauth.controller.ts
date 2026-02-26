import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "../../utils/apiResponse";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const OAuthController = {
  async googleCallback(req: Request, res: Response) {
    try {
      const user = req.user as any;

      if (!user) {
        return errorResponse(res, "Authentication failed", 401);
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" },
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // return successResponse(res, "Google login successful", {
      //   token,
      //   user: {
      //     id: user.id,
      //     email: user.email,
      //     name: user.name,
      //   },
      // });
      return res.redirect("http://localhost:3000/dashboard?name=" + encodeURIComponent(user.name) 
      + "&email=" + encodeURIComponent(user.email) + "&token=" + encodeURIComponent(token));
    } catch (error) {
      console.error(error);
      return errorResponse(res, "OAuth failed");
    }
  },
};
