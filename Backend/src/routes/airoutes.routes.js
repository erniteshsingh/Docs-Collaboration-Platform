import express from "express";
import { generateContentController } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/generate", generateContentController);

export default router;
