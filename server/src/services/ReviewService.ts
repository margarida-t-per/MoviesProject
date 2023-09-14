import IReview from "../interfaces/ReviewInterface.js";
import ReviewRepository from "../repositories/ReviewRepository.js";
import ReviewModel from "../models/reviewModel.js";

class ReviewService {
  async createReview(reviewData: IReview) {
    try {
      console.log(reviewData);
      const savedReview = await ReviewRepository.createReview(reviewData);
      return savedReview;
    } catch (err) {
      throw err;
    }
  }
  async getAllReviewsByMovie(movieId: string): Promise<IReview[]> {
    try {
      const reviews = await ReviewRepository.getAllReviewsByMovie(movieId);
      return reviews;
    } catch (error) {
      throw new Error("Error creating review");
    }
  }
  async deleteReview(id: string) {
    try {
      const deletedReview = await ReviewRepository.deleteReview(id);
      return deletedReview;
    } catch (error) {
      throw new Error("Error deleting review");
    }
  }
}
export default new ReviewService();
