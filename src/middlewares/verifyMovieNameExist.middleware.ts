import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.error";
import { movieRepository } from "../repositories";

export const verifyMovieNameExistMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if(!req.body.name) {
    return next();
  }

  const searchingMovieName = await movieRepository.findOne({ where: { name: req.body.name } });

  if(!searchingMovieName) {
    return next();
  }
  
  throw new AppError('Movie already exists.', 409);
}