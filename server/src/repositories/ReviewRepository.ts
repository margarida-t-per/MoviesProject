import IReview from "../interfaces/ReviewInterface.js";
import ReviewModel from "../models/reviewModel.js";

class ReviewRepository {
  async createReview(reviewData: IReview) {
    try {
      const newReview = new ReviewModel(reviewData);
      await newReview.save();
      const reviews = await ReviewModel.find({ movieId: reviewData.movieId });
      console.log(`Review` + reviews);
      return reviews;
    } catch (err) {
      throw err;
    }
  }
  async deleteReview(id: string) {
    try {
      const reviewToDelete = await ReviewModel.findById(id);

      if (!reviewToDelete) {
        throw new Error("Review not found");
      }

      const movieId = reviewToDelete.movieId;

      await ReviewModel.findByIdAndDelete(id);

      const reviews = await ReviewModel.find({ movieId });
      return reviews;
    } catch (err) {
      throw err;
    }
  }
  async getAllReviewsByMovie(movieId: string) {
    try {
      return await ReviewModel.find({ movieId });
    } catch (err) {
      throw err;
    }
  }
}
export default new ReviewRepository();
