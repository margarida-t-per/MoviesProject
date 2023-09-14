import IMovie from "../interfaces/MovieInterface.js";
import MovieModel from "../models/movieModel.js";

class MovieRepository {
  async createMovie(movieData: IMovie) {
    try {
      const newMovie = new MovieModel(movieData);
      return await newMovie.save();
    } catch (err) {
      throw err;
    }
  }
  async deleteMovie(id: string) {
    try {
      return await MovieModel.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }

  async updateMovie(id: string, movieData: IMovie) {
    try {
      return await MovieModel.findByIdAndUpdate(id, movieData, { new: true });
    } catch (err) {
      throw err;
    }
  }

  async getMovieByID(id: string) {
    try {
      return await MovieModel.findById(id);
    } catch (err) {
      throw err;
    }
  }
  async getAllMovies() {
    try {
      return await MovieModel.find();
    } catch (err) {
      throw err;
    }
  }
}
export default new MovieRepository();
