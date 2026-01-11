import express from 'express';
const app = express();
import corsMiddleware from './middleware/cors.js';
import morgan from 'morgan';
import getUserFromToken from './middleware/getUserFromToken.js';
import usersRouter from './api/usersRouter.js';
import movieRouter from './api/movieRouter.js';
import genreRouter from './api/genreRouter.js';
import reviewRouter from './api/reviewRouter.js';
import favoritesRouter from './api/favoritesRouter.js';

app.use(express.json());
app.use(corsMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// middleware routes
app.use(getUserFromToken);


//api routes
app.use('/users', usersRouter);
app.use('/movies', movieRouter);
app.use('/genre', genreRouter);
app.use('/reviews', reviewRouter);
app.use('/favorites', favoritesRouter);


app.use ((err, req, res, next) => {
    switch (err.code) {
        //invalid type
        case '22P02':return res.status(400).send(err.message);
        //unique constraint violation
        case '23505':return res.status(400).send(err.detail);
        //foreign key violation    
        case'23503': return res.status(400).send (err.detail);
        default: next (err);
    }
});

app.use ((err, req, res, next) => {
    console.error (err);
    res.status (500).send ("ERROR! SOMETHING WENT WRONG ");
});
export default app;