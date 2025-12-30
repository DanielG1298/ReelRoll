import db from '../client.js';

export async function createMovie({ title, description, release_year, duration_minutes, director, poster_url}){
    const sql = `
    INSERT INTO movies (title, description, release_year, duration_minutes, director, poster_url)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING id, title, description, release_year, duration_minutes, director, poster_url`;
    const { rows: [movie] } = await db.query(sql, [title, description, release_year, duration_minutes, director, poster_url]);
    return movie;
}

export async function getAllMovies(){
    const sql = `
    SELECT * FROM movies`;
    const { rows: movies } = await db.query(sql);
    return movies;
}

export async function getMovieById(id){
    const sql = `
    SELECT * FROM movies WHERE id = $1`;
    const { rows: [movie] } = await db.query(sql, [id]);
    return movie;
}
export async function getMoviesByDirector(director){
    const sql = `
    SELECT * FROM movies WHERE director = $1`;
    const { rows: movies } = await db.query(sql, [director]);
    return movies;
}
export async function getMoviesByReleaseYear(releaseYear){
    const sql = `
    SELECT * FROM movies WHERE release_year = $1`;
    const { rows: movies } = await db.query(sql, [releaseYear]);
    return movies;
}

export async function getMovieByDuration(duration_minutes){
    const sql = `
    SELECT * FROM movies WHERE duration_minutes = $1`;
    const { rows: movies } = await db.query(sql, [duration_minutes]);
    return movies;
}

export async function getMoviesByGenre(genreId){
    const sql = `
    SELECT movies.* FROM movies
    JOIN movie_genre ON movies.id = movie_genre.movie_id
    WHERE movie_genre.genre_id = $1`;
    const { rows: movies} = await db.query(sql, [genreId]);
    return movies;}

// get movie by random title
export async function getRandomMovies(){
    const sql = `
    SELECT * FROM movies
    ORDER BY RANDOM()
    LIMIT 3`;
    const { rows: movies} = await db.query(sql);
    return movies;
 }


// get movie by random title from selected genre 
export async function getRandomMoviesByGenre(genreId){
    const sql = `
    SELECT m.* FROM movies m
    JOIN movie_genre mg
    ON m.id = mg.movie_id
    WHERE mg.genre_id = $1
    ORDER BY RANDOM()
    LIMIT 3`;
    const { rows: movies } = await db.query(sql, [genreId]);
    return movies;
}

