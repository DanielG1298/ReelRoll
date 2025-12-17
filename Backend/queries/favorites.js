import db from '../client.js';

export async function createFavorites({ userId, movieId}){
    const sql =`
    INSERT INTO favorites (user_id, movie_id)
    VALUES ($1, $2)
    RETURNING id, user_id, movie_id`;
    const {rows: [favorites] } = await db.query(sql, [userId, movieId]);
    return favorites;
}

export async function getFavoritesByUserId(userId){
    const sql = `
    SELECT * FROM favorites WHERE user_id = $1`;
    const { rows: favorites } = await db.query(sql, [userId]);
    return favorites;
}