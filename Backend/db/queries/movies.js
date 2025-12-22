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
export async function getMoviesByGenre(genreId){
    const sql = `
    SELECT movies.* FROM movies
    JOIN movie_genres ON movies.id = movie_genres.movie_id
    WHERE movie_genres.genre_id = $1`;
    const { rows: movies} = await db.query(sql, [genreId]);
    return movies;}