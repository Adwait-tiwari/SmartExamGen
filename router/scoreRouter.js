import express from "express";
import { submitScore, getUserScores } from "../controller/ScoreController.js";

const router = express.Router();

router.post("/submit", submitScore);
router.get("/user/:userId", getUserScores);

export default router;