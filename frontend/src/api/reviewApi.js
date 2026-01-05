// GET reviews for a movie
export async function getReviewsByMovie(token, movieId) {
  try {
    const response = await fetch(`/reviews/movie/${movieId}`, {
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

// CREATE a review
export async function createReview(token, { movieId, rating, comment }) {
  try {
    const response = await fetch("/reviews", {
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
    const response = await fetch("/reviews/user", {
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
    const response = await fetch(`/reviews/${reviewId}`, {
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
    const response = await fetch(`/reviews/${reviewId}`, {
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