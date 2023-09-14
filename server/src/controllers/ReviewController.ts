import { Request, Response } from "express";
import IReview from "../interfaces/ReviewInterface.js";
import ReviewService from "../services/ReviewService.js";

class ReviewController {
  //Get All Reviews
  async getAll(req: Request, res: Response) {
    const movieId = req.params.movieId;
    try {
      const reviews = await ReviewService.getAllReviewsByMovie(movieId);
      res.status(200).json(reviews);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  //Create a new review
  async create(req: Request, res: Response) {
    const { movieId, userId, rating, comment } = req.body;
    console.log(movieId, userId, rating, comment);
    try {
      const newReview = {
        movieId,
        userId,
        rating,
        comment,
      } as IReview;

      const savedReview = await ReviewService.createReview(newReview);

      res.status(201).json(savedReview);
    } catch (err) {
      console.error(err);
    }
  }

  //Delete one review
  async delete(req: Request, res: Response) {
    const reviewId = req.params.id;
    try {
      const deletedReview = await ReviewService.deleteReview(reviewId);
      res.status(200).json(deletedReview);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
}
export default new ReviewController();
