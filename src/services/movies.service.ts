import { Movie } from "../entities"
import { CreateMovie, ReadMovieReturn, UpdateMovie } from "../interfaces/movies.interface";
import { Pagination } from "../interfaces/pagination.interface";
import { movieRepository } from "../repositories";

export const readMoviesService = async ({ page, perPage, nextPage, order, sort, prevPage }: Pagination): Promise<ReadMovieReturn> => {
  const [ movies, count ] = await movieRepository.findAndCount({
    order: { [sort]: order },
    skip: page,
    take: perPage
  })

  return {
    prevPage: page > 1 ? prevPage : null,
    nextPage: count - page <= perPage ? null : nextPage,
    count,
    data: movies
  }
}

export const createMovieService = async (payload: CreateMovie): Promise<Movie> => {
  const movie = movieRepository.create(payload);
  await movieRepository.save(movie);

  return movie;
}

export const updateMovieService = async (movie: Movie, payload: UpdateMovie): Promise<Movie> => {
  const updatedMovie = movieRepository.create({...movie, ...payload});
  await movieRepository.save(updatedMovie);

  return updatedMovie;
}

export const deleteMovieService = async (movieId: number): Promise<void> => {
  await movieRepository.delete({ id: movieId });
}