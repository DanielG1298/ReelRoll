import db from '../client.js';

export async function createReview({ userId, movieId, userId, rating, comment}){
    const sql = `
    INSERT INTO reviews (user_id, movie_id, rating, comment)
    VALUES ($1, $2, $3, $4)
    RETURNING id, user_id, movie_id, rating, comment`;
    const { rows: [review] } = await db.query(sql, [userId, movieId, rating, comment]);
    return review;
}
export async function getReviewsByMovieId(movieId){
    const sql = `
    SELECT * FROM reviews WHERE movie_id = $1`;
    const { rows: reviews } = await db.query(sql, [movieId]);
    return reviews;
}
 export async function getReviewsByUserId(userId){
    const sql = `
    SELECT * FROM reviews WHERE user_id = $1`;
    const { rows: reviews } = await db.query(sql, [userId]);
    return reviews;
}
export async function deleteReview(reviewId){
    const sql = `
    DELETE FROM reviews WHERE id = $1
    RETURNING id, user_id, movie_id, rating, comment`;
    const { rows: [review] } = await db.query(sql, [reviewId]);
    return review;
}