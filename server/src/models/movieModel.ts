import mongoose from "mongoose";
import IMovie from "../interfaces/MovieInterface.js";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
});

const MovieModel = mongoose.model<IMovie>("Movie", movieSchema);

export default MovieModel;
