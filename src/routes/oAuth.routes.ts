import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

/**
 * API 1: Start Google Login
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

/**
 * API 2: Google Callback
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req: any, res) => {
    const user = req.user;

    const token = jwt.sign(
  { id: user.id },   // ✅ FIXED
  process.env.JWT_SECRET || "secret",
  { expiresIn: "7d" }
);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // redirect to frontend
    res.redirect(`http://localhost:3002/dashboard?token=${token}`);
  }
);

export default router;
