import db from '../client.js';

export async function createMovieGenres({movie_id, genre_id}){
    const sql = `
    INSERT INTO movie_genre (movie_id, genre_id)
    VALUES ($1, $2)
    RETURNING movie_id, genre_id`;
    const { rows: [row] } = await db.query(sql, [movie_id, genre_id]);
    return row;
    
}