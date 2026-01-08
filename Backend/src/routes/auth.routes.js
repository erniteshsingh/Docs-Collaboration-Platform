import express from "express";
const router = express.Router();

// Users Registration Route

import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import { validate } from "../middlewares/auth.validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import { registerUser, loginUser } from "../controllers/auth.controller.js";

router.post("/register", registerValidator, validate, registerUser);

router.post("/login", loginValidator, validate, loginUser);

export default router;
