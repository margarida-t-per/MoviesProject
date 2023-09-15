import express from "express";
import ReviewController from "../controllers/ReviewController.js";
import {authMiddleware, isAdmin} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:movieId/review", ReviewController.getAll);
router.post("/:movieId/review",authMiddleware, ReviewController.create);
router.delete("/:movieId/review/:id",isAdmin, ReviewController.delete);

export default router;
