import express from "express";
import ReviewController from "../controllers/ReviewController.js";

const router = express.Router();

router.get("/:movieId/review", ReviewController.getAll);
router.post("/:movieId/review", ReviewController.create);
router.delete("/:movieId/review/:id", ReviewController.delete);

export default router;
