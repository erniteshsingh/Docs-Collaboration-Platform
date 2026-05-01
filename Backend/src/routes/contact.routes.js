import express from "express";
import { createContact } from "../controllers/contact.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createContact);

export default router;
