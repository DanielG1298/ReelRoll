import { api } from "./client.js";

// GET reviews for a movie
export async function getReviewsByMovie(movieId) {
  try {
    const response = await fetch(api(`/reviews/movie/${movieId}`));
    if (!response.ok) throw new Error("failed to fetch reviews");
    const result = await response.json();
    return Array.isArray(result) ? result : [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

// CREATE a review
export async function createReview(token, { movieId, rating, comment }) {
  try {
    const response = await fetch(api("/reviews"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ movieId, rating, comment }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// GET current user's reviews
export async function getUserReviews(token) {
  try {
    const response = await fetch(api("/reviews/user"), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// UPDATE a review
export async function updateReview(token, reviewId, { rating, comment }) {
  try {
    const response = await fetch(api(`/reviews/${reviewId}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating, comment }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// DELETE a review
export async function deleteReview(token, reviewId) {
  try {
    const response = await fetch(api(`/reviews/${reviewId}`), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
}
