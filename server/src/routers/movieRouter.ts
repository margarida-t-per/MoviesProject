import express from "express";
import MovieController from "../controllers/MovieController.js";
import { isAdmin} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/movies", MovieController.getAll);
router.get("/movies/:id", MovieController.getOne);
router.post("/movies/", isAdmin, MovieController.create);
router.put("/movies/:id", isAdmin,  MovieController.update);
router.delete("/movies/:id", isAdmin,  MovieController.delete);

export default router;
