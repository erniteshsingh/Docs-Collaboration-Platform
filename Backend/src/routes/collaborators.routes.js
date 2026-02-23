import express from "express";
const router = express.Router();

import {
  addCollaborators,
  removeCollaborator,
} from "../controllers/collaborators.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/:id/collaborators", authMiddleware, addCollaborators);

router.delete("/:id/collaborators", authMiddleware, removeCollaborator);

export default router;
