import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";

export const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);