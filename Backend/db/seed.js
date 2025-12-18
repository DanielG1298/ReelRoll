import db from "./client.js";
import { createMovie } from "./queries/movies.js";
import { createGenre } from "./queries/genres.js";
import { createMovieGenres } from "./queries/movie_genres.js";
import { createFavorites } from "./queries/favorites.js";
import { createUser } from "./queries/users.js";
import {createreview } from "./queries/reviews.js";
import { faker } from '@faker-js/faker';
import { movies } from "../movieData.js";

await db.connect();
await seed();
await db.end();
console.log ("database seeded");
//seed function to populate the database

async function seed(){
    //insert movies
    try{
    for (const movie of movies){
        const createdMovie = await createMovie({
            title: movie.title,
            description: movie.description,
            release_year: movie.release_year,
            duration_minutes: movie.duration_minutes,
            director: movie.director,
            poster_url: movie.poster_url,
            genres: movie.genres
        });
        //insert genres
        for (const genreName of movie.genres){
            const genre = await createGenre(genreName);
        //link movie_genres table to movies and genres
            await createMovieGenres({
                movie_id: movies.id,
                genre_id: genre.id
            });

        }
    }
    }catch(error){
        console.log(error)
    }

}
