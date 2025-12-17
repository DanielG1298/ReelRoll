import db from '../client.js';

export async function createMovieGenres(movieId, genreId){
    const sql = `
    INSERT INTO movie_genres (movie_id, genre_id)
    VALUES ($1, $2)
    RETURNING movie_id, genre_id`;
    const { rows: [movieGenre] } = await db.query(sql, [movieId, genreId]);
    return movieGenre;
    
}