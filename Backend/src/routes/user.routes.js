import express from "express";
const router = express.Router();

// Get current user
router.get("/me", (req, res) => {
  res.send("You have entred Insdie your profile!");
});

export default router;
