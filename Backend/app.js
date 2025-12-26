import express from 'express';
const app = express();
export default app;
import morgan from 'morgan';
import GetUserFromToken from './middleware/GetUserFromToken.js';
import usersRouter from './api/usersRouter.js';
import movieRouter from './api/movieRouter.js';
import genreRouter from './api/genreRouter.js';
import reviewRouter from './api/reviewRouter.js';
import favoritesRouter from './api/favoritesRouter.js';


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// middleware to extract user from token
app.use(GetUserFromToken);

//api routes
app.use('users', usersRouter);
app.use('/movies', movieRouter);
app.use('/genres', genreRouter);
app.use('/reviews', reviewRouter);
app.use('/favorites', favoritesRouter);


app.use ((err, req, res, next) => {
    switch (err.code) {
        //invalid type
        case '22P02':return res.status(400).send(err.message);
        //unique constraint violation
        case '23505':res.status(400).send("unique constraint violation");
        //foreign key violation    
        case'23503': return res.status(400).send (err.detail);
        default: next (err);
    }
});

app.use ((err, req, res, next) => {
    console.error (err);
    res.status (500).send ("ERROR! SOMETHING WENT WRONG ");
});