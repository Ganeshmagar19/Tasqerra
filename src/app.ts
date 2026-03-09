import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes"
import passport from "./middlewares/passport";
import googleAuthRoutes from "./routes/oAuth.routes"
import boardRoutes from "./routes/board.routes";
import listRoutes from "./routes/list.routes";
import cardRoutes from "./routes/card.routes";
import commentRoutes from "./routes/comment.routes";
import attachmentRoutes from "./routes/attachment.routes";


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.use(passport.initialize());
app.use("/auth", authRoutes);
app.use("/api/auth", googleAuthRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api", listRoutes);
app.use("/api", cardRoutes);
app.use("/api", commentRoutes);
app.use("/api", attachmentRoutes);

export default app;
