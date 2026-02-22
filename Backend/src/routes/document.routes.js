import express from "express";
const router = express.Router();

import {
  createDocument,
  getAllDocuments,
  getSingleDocument,
  updateDocument,
  deleteDocument,
} from "../controllers/document.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkDocumentPermission } from "../middlewares/checkDocumentationPermission.js";

router.post("/", authMiddleware, createDocument);

router.get("/", authMiddleware, getAllDocuments);

router.get(
  "/:id",
  authMiddleware,
  checkDocumentPermission("viewer"),
  getSingleDocument,
);

router.patch(
  "/:id",
  authMiddleware,
  checkDocumentPermission("editor"),
  updateDocument,
);

router.delete(
  "/:id",
  authMiddleware,
  checkDocumentPermission("owner"),
  deleteDocument,
);

export default router;
