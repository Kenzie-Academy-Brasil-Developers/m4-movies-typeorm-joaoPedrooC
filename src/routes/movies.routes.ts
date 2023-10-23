import { Router } from "express";
import { createMovieController, deleteMovieController, readMoviesController, updateMovieController } from "../controllers/movies.controller";
import { verifyMovieNameExistMiddleware } from "../middlewares/verifyMovieNameExist.middleware";
import { paginationMiddleware } from "../middlewares/pagination.middleware";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { CreateMovieSchema, UpdateMovieSchema } from "../schemas/movies.schemas";
import { verifyMovieIdExistsMiddleware } from "../middlewares/verifyMovieIdExists.middleware";

export const moviesRouter = Router();

moviesRouter.get('/', paginationMiddleware, readMoviesController);
moviesRouter.post('/', validateBodyMiddleware(CreateMovieSchema), verifyMovieNameExistMiddleware, createMovieController);
moviesRouter.patch('/:id', validateBodyMiddleware(UpdateMovieSchema), verifyMovieIdExistsMiddleware, verifyMovieNameExistMiddleware, updateMovieController);
moviesRouter.delete('/:id', verifyMovieIdExistsMiddleware, deleteMovieController);