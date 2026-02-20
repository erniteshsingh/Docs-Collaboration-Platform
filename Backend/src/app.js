import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

import authRoutes from "./routes/auth.routes.js";
app.use("/api/v1/auth", authRoutes);

import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/users", userRoutes);

import documentRoutes from "./routes/document.routes.js";
app.use("/api/v1/documents", documentRoutes);

import collaboratorRoutes from "./routes/collaborators.routes.js";
app.use("/api/v1/documents", collaboratorRoutes);

export default app;
