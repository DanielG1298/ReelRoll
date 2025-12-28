import express from 'express';
const favoritesRouter = express.Router();

import { createFavorites, getFavorites, deleteFavorite } from '../db/queries/favorites.js';
import requireUser from '../middleware/requireUser.js';
export default favoritesRouter;

favoritesRouter.use(requireUser)

// add to favorites
favoritesRouter.post('/:movieId', async (req, res, next) =>{
    try{
        const userId = req.user.id;

        const movieId = req.params.movieId;

        const favorite = await createFavorites({ userId, movieId});
        res.status(201).json(favorite);
    }catch(err){
        next(err);
    }
});
// get favorites by userid
favoritesRouter.get('/', async(req,res,next) =>{
    try{
        const userId = req.user.id;

        const favoriteMovies = await getFavorites(userId);
        res.status(200).json(favoriteMovies);
    }catch(err){
        next(err);
    }
});
// remove from favorites
favoritesRouter.delete('/:movieId', async(req,res,next) =>{
    try{
        const userId = req.user.id;

        const movieId = req.params.movieId;

        const favorite = await deleteFavorite(userId, movieId);
        res.status(200).json(favorite);
    }catch(err){
        next(err);
    }
})