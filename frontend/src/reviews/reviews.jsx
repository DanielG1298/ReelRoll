import { useState, useEffect } from "react";
import { useAuth } from "../auth/auth.jsx";
import { getReviewsByMovie, createReview,getUserReviews,updateReview,deleteReview } from "../api/reviewApi.js";
import "../CSS/reviews.css";
export default function ReviewsTab( {movieId} ){
    
    const [editingId, setEditingId] = useState(null);
    const [editRating, setEditRating] = useState("");
    const [editComment, setEditComment] = useState("");

    const [review, setReview] = useState([]);
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const { token } = useAuth();
    
    //create review and set new reviews at top of list 
    const handleSubmitReview = async (event) => {
    event.preventDefault();

    try {
        const data = await createReview(token, { movieId, rating, comment });

        if (!data || !data.id) {
            console.error("createReview returned null/invalid:", data);
        return;
        }

        setReview((prev) => [data, ...prev]); // add to top
        setRating("");
        setComment("");
    } catch (err) {
        console.error("Error creating review:", err);
    }
};
    //fetch reviews by movie
    useEffect(() =>{
        const fetchReviews = async () => {
             const data = await getReviewsByMovie( movieId );
            setReview(data);
        }; fetchReviews(); 
    }, [token]);

    

    //update reviews by removing old review and adding new one 
    const handleUpdateReview = async(reviewId, rating, comment) =>{
       try{
        const data = await updateReview( token, reviewId, { rating, comment });
        setReview((prevReview) =>
            prevReview.map((r) => (r.id) === reviewId ? data : r));
       }catch(err){
        console.error("Error updating review:", err);
       }
    }   

    //delete reviews
    const handleDeleteReview = async (reviewId) =>{
        try{
            await deleteReview(token, reviewId);
            setReview((prevReviews) => prevReviews.filter((r) => r.id !== reviewId));
        }catch(err){
            console.error(err)
        }
    }

     return (
    <>
      <h2>Reviews</h2>

      {token && (
        <form className="create-Review-form" onSubmit={handleSubmitReview}>
          <label className="rating-label">
            Rating:
            <input
              type="number"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </label>

          <label className="comment-label">
            Comment:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </label>

          <button type="submit">Submit Review</button>
        </form>
      )}

      {!token && <p>Please log in to submit a review.</p>}

      {review.length === 0 ? (
        <p>No Reviews yet.</p>
      ) : (
        <ul className="reviews-list">
          {review.map((r) => (
            <li key={r.id}>
              <strong className="username">{r.username}</strong>

              {editingId === r.id ? (
                <>
                  <div className="edit-rating-form">
                    <label className="rating-label">
                      Rating:
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={editRating}
                        onChange={(e) => setEditRating(e.target.value)}
                        required
                      />
                    </label>
                  </div>

                  <div>
                    <label className="comment-label">
                      Comment:
                      <textarea value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        required
                      />
                    </label>
                  </div>

                  {token && (
                    <>
                      <button className="save-button"
                        type="button"
                        onClick={() => {
                          handleUpdateReview(r.id, Number(editRating),editComment);
                          // minimal cancel/reset after save
                          setEditingId(null);
                          setEditRating("");
                          setEditComment("");
                        }}>Save</button>
                        
                        // cancel edit
                      <button className="cancel-button"
                      type="button"
                        onClick={() => {
                          
                          setEditingId(null);
                          setEditRating("");
                          setEditComment("");
                        }}>Cancel</button>

                      <button 
                      className="delete-button"
                        type="button"
                        onClick={() => {
                          handleDeleteReview(r.id);
                          // if deleting while editing, reset edit state
                          setEditingId(null);
                          setEditRating("");
                          setEditComment("");
                        }}>Delete Review</button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <span> - {r.rating}/10</span>
                  <p>{r.comment}</p>

                  {token && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          // start edit (minimal)
                          setEditingId(r.id);
                          setEditRating(String(r.rating ?? ""));
                          setEditComment(r.comment ?? "");
                        }}>Edit</button>

                      <button type="button"
                        onClick={() => handleDeleteReview(r.id)}>Delete Review</button>
                    </>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

