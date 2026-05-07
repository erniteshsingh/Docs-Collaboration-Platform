import express from "express";
const router = express.Router();

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { getUserProfile } from "../controllers/user.controller.js";
import { updateProfile } from "../controllers/user.controller.js";
router.get("/me", authMiddleware, getUserProfile);

router.put("/update-profile",authMiddleware, updateProfile);

export default router;
