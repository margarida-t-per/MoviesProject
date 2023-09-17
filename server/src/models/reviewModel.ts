import mongoose from "mongoose";
import IReview from "../interfaces/ReviewInterface.js";

const reviewSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
});

const ReviewModel = mongoose.model<IReview>("Review", reviewSchema);

export default ReviewModel;
