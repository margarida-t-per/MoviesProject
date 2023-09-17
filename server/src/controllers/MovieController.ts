import { Request, Response } from "express";
import IMovie from "../interfaces/MovieInterface.js";
import MovieService from "../services/MovieService.js";
import FileService from "../services/FileService.js";
import MovieModel from "../models/movieModel.js";

class MovieController {
  //Get All Movies
  async getAll(req: Request, res: Response) {
    try {
      const movies = await MovieService.getAllMovies();

      const moviesWithImageUrl = movies.map((movie) => {
        const fullImageUrl = `${req.protocol}://${req.get("host")}/${
          movie.posterUrl
        }`;
        return {
          ...movie.toJSON(),
          posterUrl: fullImageUrl,
        };
      });

      res.status(200).json(moviesWithImageUrl);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  //Get one
  async getOne(req: Request, res: Response) {
    const movieId = req.params.id;
    try {
      const foundMovie = await MovieService.getOneMovie(movieId);

      const fullImageUrl = `${req.protocol}://${req.get("host")}/${
        foundMovie?.posterUrl
      }`;

      const movieWithImageUrl = {
        ...foundMovie?.toJSON(),
        posterUrl: fullImageUrl,
      };

      res.json(movieWithImageUrl);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  //Create a new movie
  async create(req: Request, res: Response) {
    const { title, releaseDate, trailerLink, genres } = req.body;

    console.log("here", req.files?.posterUrl);
    try {
      const image = req.files?.posterUrl;

      let imageUrl = "no-image.png";

      if (image) {
        imageUrl = await FileService.save(image);
      }

      const newMovie = {
        title,
        releaseDate,
        trailerLink,
        posterUrl: imageUrl,
        genres,
      } as IMovie;

      const savedMovie = await MovieService.createMovie(newMovie);

      res.status(201).json(savedMovie);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  //Delete one movie
  async delete(req: Request, res: Response) {
    const movieId = req.params.id;
    try {
      const deletedMovie = await MovieService.deleteMovie(movieId);
      res.status(200).json(deletedMovie);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  //Update one movie
  async update(req: Request, res: Response) {
    const movieId = req.params.id;
    const { title, releaseDate, trailerLink, genres } = req.body;

    try {
      const image = req.files?.posterUrl;

      let existingMovie: IMovie | null = await MovieModel.findById(movieId);

      if (!existingMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      let imageUrl = existingMovie.posterUrl;
      if (image) {
        imageUrl = await FileService.save(image);

        if (existingMovie.posterUrl !== "no-image.png") {
          await FileService.delete(existingMovie.posterUrl);
        }
      }

      const newMovieDetails = {
        title,
        releaseDate,
        trailerLink,
        posterUrl: imageUrl,
        genres,
      } as IMovie;

      const updatedMovie = await MovieService.updateMovie(
        movieId,
        newMovieDetails
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default new MovieController();
