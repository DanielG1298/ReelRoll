import express from 'express';
const app = express();
export default app;
import morgan from 'morgan';


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));





app.use ((err, req, res, next) => {
    switch (err.code) {
        //invald type
        case '22P02':return res.status(400).send(err.message);
        //unique constraint violation
        case '23505':
        //foreign key violation    
        case'23503': return res.status(400).send (err.detail);
        default: next (err);
    }
});

app.use ((err, req, res, next) => {
    console.error (err);
    res.status (500).send ("ERROR! SOMETHING WENT WRONG ");
});