import express from 'express';
const genreRouter = express.Router();
import { getGenreById, getAllGenres } from '../db/queries/genre.js';
export default genreRouter;

// get all genres 
genreRouter.get('/', async (req, res, next) =>{
    try{
        const genres = await getAllGenres();
        res.json(genres);
    }catch(err){
        next(err);
    }
});
// get genre by id 
genreRouter.get('/:genreId', async (req,res,next) => {
    try{
        const genre = await getGenreById(req.params.genreId);
        if(!genre) return res.status(404).send("genre not found")
        res.json(genre);
    }catch(err){
        next(err);
    }
});