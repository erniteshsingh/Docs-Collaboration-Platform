import express from "express";
const router = express.Router();

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getUserProfile } from "../controllers/user.controller.js";

router.get("/me", authMiddleware, getUserProfile);

export default router;
