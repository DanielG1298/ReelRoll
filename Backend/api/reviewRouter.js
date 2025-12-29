import express from 'express';
const reviewRouter = express.Router();
import {createReview, getReviewsByMovieId, getReviewsByUserId,updateReview, deleteReview} from '../db/queries/reviews.js';
import requireUser from '../middleware/requireUser.js';

export default reviewRouter;

// requires users too be logged in to create, update, delete reviews
reviewRouter.use(requireUser);

// create a review 
reviewRouter.post('/', async( req, res, next) =>{
    try{
        const userId = req.user.id;
        
        const { movieId, rating, comment } = req.body;

        const review = await createReview({ userId, movieId, rating, comment});
        res.status(201).json(review);
    }catch(err){
        next(err);
    }
});

// get reviews by movie id 
reviewRouter.get('/movie/:movieId', async(req,res,next) =>{
    try{
       const movieId = req.params.movieId; 

       const reviews = await getReviewsByMovieId(movieId);
       
       res.status(200).json(reviews);
    }catch(err){
        next(err);
    }
});


//get reviews by user id 
reviewRouter.get('/reviews', async(req, res, next) =>{
    try{
        const userId = req.params.userId;

        const reviews = await getReviewsByUserId(userId);
        res.status(200).json(reviews)
    }catch(err){
        next(err);
    }
});

// update review
reviewRouter.put('/:reviewId', async(req,res,next) =>{
    try{
        const reviewId = req.params.reviewId;

        const { rating, comment } = req.body;

        const review = await updateReview({ reviewId, rating, comment });

        if (!review) return res.status(404).send('Review not found');

        res.status(200).json(review);
    }catch(err){
        next(err);
    }
});

// delete review
reviewRouter.delete('/:reviewId', async(req,res,next) =>{
    try{
        const reviewId = req.params.reviewId;

        const review = await deleteReview(reviewId);

        if(!review) return res.status(404).send('Review not found');
        res.json(review);
    }catch(err){
        next(err);
    }
});
