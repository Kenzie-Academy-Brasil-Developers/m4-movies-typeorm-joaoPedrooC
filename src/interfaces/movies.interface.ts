import { z } from "zod";
import { CreateMovieSchema, MovieSchema, UpdateMovieSchema } from "../schemas/movies.schemas";

export type Movie = z.infer<typeof MovieSchema>;
export type CreateMovie = z.infer<typeof CreateMovieSchema>;
export type UpdateMovie = z.infer<typeof UpdateMovieSchema>;

export type ReadMovieReturn = {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: Array<Movie>;
};