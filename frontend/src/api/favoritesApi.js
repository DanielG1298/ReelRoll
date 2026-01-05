// get favorites for logged in user
export async function getFavorites(token) {
  try {
    const response = await fetch("/favorites", {
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

// add favorite 
export async function addFavorite(token, movieId) {
  try {
    const response = await fetch(`/favorites/${movieId}`, {
      method: "POST",
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

// remove favorite (movieId required)
export async function removeFavorite(token, movieId) {
  try {
    const response = await fetch(`/favorites/${movieId}`, {
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