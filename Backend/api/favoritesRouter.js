import express from 'express';
const favoritesRouter = express.Router();
export default favoritesRouter;

import { addFavorite, getFavoritesByUserId, removeFavorite } from '../db/favoritesQueries.js';
import requireUser from '../middleware/requireUser.js';
