import { Document } from "mongoose";

export default interface IReview extends Document {
  movieId: string;
  userId: string;
  rating: number;
  comment: string;
}
