import { useState, useEffecct } from "react";
import { useAuth } from "../auth/auth.jsx";
import { getReviewsByMovie, createReview,getUserReviews,updateReviews,deleteReview } from "../api/reviewApi.js";
export default function reviewsTab(){
    const [review, setReview] = useState([]);
    const { token } = useAuth();
    
    return(
        <>
        <h1>Reviews</h1>
        
        </>
    )
};