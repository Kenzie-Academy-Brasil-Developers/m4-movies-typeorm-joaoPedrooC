import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  description: z.string().nullable().nullish(),
  duration: z.number().positive().int(),
  price: z.number().positive().int()
});

export const CreateMovieSchema = MovieSchema.omit({ id: true });
export const UpdateMovieSchema = CreateMovieSchema.partial();
export const ReadMovieSchema = MovieSchema.array();