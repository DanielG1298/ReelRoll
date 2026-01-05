import express from 'express';
const movieRouter = express.Router();
import { getAllMovies, getMovieById, getMoviesByGenre, getRandomMoviesByGenre, getRandomMovies } from '../db/queries/movies.js';
import requireUser from '../middleware/requireUser.js';
export default movieRouter;
//get all movies
movieRouter.get('/', async (req, res, next) =>{
    try{
        const movies = await getAllMovies();
        res.status(200).json({movies});
    }catch(err){
        next(err);
    }
})

//get movie by genre
movieRouter.get('/genre/:genreId', async(req, res, next) =>{
    try{
        const genreId = Number(req.params.genreId);
        if (!Number.isInteger(genreId) || genreId <= 0){
            return res.status(400).send('Invalid genre ID');
        }

        const movies = await getMoviesByGenre(genreId);
        res.json(movies);
    }catch(err){
        next(err);
    }
});
// get random movies
movieRouter.get('/random', async(req,res,next) =>{
    try{
        const movies = await getRandomMovies();
        if(!movies || movies.length === 0 ){ return res.status(404).send('No movies found');}
        res.status(200).json(movies);
    }catch(err){
        next(err);
    }
})
//get random movie by genre 
movieRouter.get('/random/genre/:genreId', async(req,res,next) =>{
    try{
        const genreId = Number(req.params.genreId);

        if (!Number.isInteger(genreId) || genreId <= 0){
            return res.status(400).send('Invalid genre ID');
        }

        const movies = await getRandomMoviesByGenre(genreId);
        if(movies.length === 0){ return res.status(404).send('No movies found for this genre');}

        res.json(movies);
    }catch(err){
        next(err);
    }});
// get movie by id 
movieRouter.param('id', async(req, res, next, id) =>{
    try{
        const movie = await getMovieById(req.params.id);
        if(!movie){return res.status(404).send ('Movie not found')};
        req.movie = movie;
        next();
    }catch(err){
        next(err);
    }
});
movieRouter.get('/:id', async(req, res, next) =>{
    try{
        res.status(200).json(req.movie);
    }catch(err){
        next(err);
    }
});
