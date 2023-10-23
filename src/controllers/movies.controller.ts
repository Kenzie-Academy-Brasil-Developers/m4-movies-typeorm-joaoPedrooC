import { Request, Response } from "express";
import { createMovieService, deleteMovieService, readMoviesService, updateMovieService } from "../services/movies.service";

export const readMoviesController = async (req: Request, res: Response): Promise<Response> => {
  const { pagination } = res.locals;
  const movies = await readMoviesService(pagination);

  return res.status(200).json(movies);
}

export const createMovieController = async (req: Request, res: Response): Promise<Response> => {
  const newMovie = await createMovieService(req.body);

  return res.status(201).json(newMovie);
}

export const updateMovieController = async (req: Request, res: Response): Promise<Response> => {
  const updatedMovie = await updateMovieService(res.locals.movie, req.body);

  return res.status(200).json(updatedMovie);
}

export const deleteMovieController = async (req: Request, res: Response): Promise<Response> => {
  await deleteMovieService(Number(req.params.id));

  return res.status(204).json();
}