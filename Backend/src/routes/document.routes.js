import express from "express";
const router = express.Router();

import {
  createDocument,
  getAllDocuments,
  getSingleDocument,
} from "../controllers/document.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/", authMiddleware, createDocument);

router.get("/", authMiddleware, getAllDocuments);

router.get("/:id", authMiddleware, getSingleDocument);

export default router;
