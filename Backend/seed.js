import db from "./client.js";
import { createMovie } from "./queries/movies.js";
import { createGenre } from "./queries/genres.js";
import { createMovieGenres } from "./queries/movie_genres.js";
import { createFavorites } from "./queries/favorites.js";
import { createUser } from "./queries/users.js";
import {createreview } from "./queries/reviews.js";
import { faker } from '@faker-js/faker';
import { movies } from "./movieData.js";
