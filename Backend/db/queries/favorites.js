import db from '../client.js';

export async function createFavorites({ userId, movieId}){
    const sql =`
    INSERT INTO favorites (user_id, movie_id)
    VALUES ($1, $2)
    RETURNING id, user_id, movie_id`;
    const {rows: [favorites] } = await db.query(sql, [userId, movieId]);
    return favorites;
}


// get favorites 
export async function getFavorites(userId){
    const sql = `
    SELECT 
    m.id AS movie_id,
    m.title,
    m.poster_url
    FROM favorites f
    JOIN movies m ON f.movie_id = m.id
    WHERE f.user_id = $1`
    const { rows: favoriteMovies } = await db.query(sql, [userId]);
    return favoriteMovies; 
}

export async function deleteFavorite(userId, movieId){
    const sql = `
    DELETE FROM favorites
    WHERE user_id = $1 AND movie_id = $2
    RETURNING id, user_id, movie_id`
    const { rows: [favorite] } = await db.query(sql, [userId, movieId]);
    return favorite;
}