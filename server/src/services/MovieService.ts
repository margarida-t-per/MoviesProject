import IMovie from "../interfaces/MovieInterface.js";
import MovieRepository from "../repositories/MovieRepository.js";
import MovieModel from "../models/movieModel.js";

class MovieService {
  async createMovie(movieData: IMovie) {
    try {
      console.log(movieData);
      const savedMovie = await MovieRepository.createMovie(movieData);
      return savedMovie;
    } catch (err) {
      throw err;
    }
  }
  async getAllMovies(): Promise<IMovie[]> {
    try {
      const movies = await MovieRepository.getAllMovies();
      return movies;
    } catch (error) {
      throw new Error("Error creating movie");
    }
  }
  async getOneMovie(id: string) {
    try {
      const foundMovie = await MovieRepository.getMovieByID(id);
      return foundMovie;
    } catch (error) {
      throw new Error("Error fetching movie");
    }
  }
  async deleteMovie(id: string) {
    try {
      const deletedMovie = await MovieRepository.deleteMovie(id);
      return deletedMovie;
    } catch (error) {
      throw new Error("Error deleting movie");
    }
  }
  async updateMovie(id: string, movieData: IMovie) {
    try {
      const updatedMovie = await MovieRepository.updateMovie(id, movieData);
      return updatedMovie;
    } catch (err) {
      throw err;
    }
  }
}
export default new MovieService();
