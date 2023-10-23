import { Router } from "express";
import { moviesRouter } from "./movies.routes";

export const routes = Router();

routes.use('/movies', moviesRouter);