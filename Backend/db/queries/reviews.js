import db from '../client.js';
// add review to table 
export async function createReview({ userId, movieId, rating, comment}){
    const sql = `
    INSERT INTO reviews (user_id, movie_id, rating, comment)
    VALUES ($1, $2, $3, $4)
    RETURNING id, user_id, movie_id, rating, comment`;
    const { rows: [review] } = await db.query(sql, [userId, movieId, rating, comment]);
    return review;
}
// get reviews by movie id
export async function getReviewsByMovieId(movieId){
    const sql = `
    SELECT * FROM reviews WHERE movie_id = $1`;
    const { rows: reviews } = await db.query(sql, [movieId]);
    return reviews;
}
// get reviews by user id 
 export async function getReviewsByUserId(userId){
    const sql = `
    SELECT * FROM reviews WHERE user_id = $1`;
    const { rows: reviews } = await db.query(sql, [userId]);
    return reviews;
}

// update reviews viw userid, movieid
export async function updateReview({ reviewId, rating, comment}){
    const sql = `
    UPDATE reviews
    SET rating = $2, comment = $3
    WHERE id = $1
    RETURNING *;`;
    const { rows: [review] } = await db.query(sql, [reviewId, rating, comment]);
    return review;
    
}
//delete review by id 
export async function deleteReview(reviewId){
    const sql = `
    DELETE FROM reviews WHERE id = $1
    RETURNING id, user_id, movie_id, rating, comment`;
    const { rows: [review] } = await db.query(sql, [reviewId]);
    return review;
}