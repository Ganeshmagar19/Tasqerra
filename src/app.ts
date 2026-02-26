import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes"
import passport from "./middlewares/passport";
import googleAuthRoutes from "./routes/oAuth.routes"

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.use(passport.initialize());
app.use("/auth", authRoutes);
app.use("/api/auth", googleAuthRoutes);

export default app;
