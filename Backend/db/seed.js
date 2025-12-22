import "dotenv/config";
import db from "./client.js";
import { createMovie } from "./queries/movies.js";
import { createGenre } from "./queries/genre.js";
import { createMovieGenres } from "./queries/movie_genres.js";
import { movies } from "../movieData.js";

await db.connect();
try{
    await seed();
    console.log ("database seeded");
}catch(error){
    console.error("error seeding database", error);
    process.exit(1);
} finally{
await db.end();
}

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
            
        });
        //insert genres
        for (const genreName of movie.genres){
            const genre = await createGenre(genreName);
        //link movie_genres table to movies and genres
            await createMovieGenres({
                movie_id: createdMovie.id,
                genre_id: genre.id
            });

        }
    }
    }catch(error){
        console.log(error)
    }

}
