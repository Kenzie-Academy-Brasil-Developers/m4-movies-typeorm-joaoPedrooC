import { NextFunction, Request, Response } from "express";
import { Movie } from "../entities";
import { AppError } from "../errors/AppError.error";
import { movieRepository } from "../repositories";

export const verifyMovieIdExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const searchingId = Number(req.params.id);
  
  const movie: Movie | null = await movieRepository.findOne({ where: { id: searchingId } });

  if(!movie) {
    throw new AppError('Movie not found', 404);
  }

  res.locals.movie = movie;
  return next();
}