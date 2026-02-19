import express from "express";
const router = express.Router();

import {
  createDocument,
  getAllDocuments,
  getSingleDocument,
  updateDocument,
  deleteDocument
} from "../controllers/document.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/", authMiddleware, createDocument);

router.get("/", authMiddleware, getAllDocuments);

router.get("/:id", authMiddleware, getSingleDocument);

router.patch("/:id",authMiddleware,updateDocument)

router.delete("/:id",authMiddleware,deleteDocument)

export default router;
