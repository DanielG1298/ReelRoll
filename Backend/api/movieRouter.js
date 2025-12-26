import express from 'express';
const movieRouter = express.Router();
export default movieRouter;

import { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } from '../db/moviesQueries.js';
import requireUser from '../middleware/requireUser.js';