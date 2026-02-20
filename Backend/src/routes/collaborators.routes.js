import express from "express";
const router = express.Router();

import { addCollaborators } from "../controllers/collaborators.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/:id/collaborators", authMiddleware, addCollaborators);

export default router;
