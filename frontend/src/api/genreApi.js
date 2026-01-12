import { api } from "./client.js";

// fetch genres
export async function getGenres() {
  try {
    const response = await fetch(api("/genre"));
    const result = await response.json();
    
    return result;
  } catch (err) {
    console.error("Error fetching genres:", err);
  }
  return [];
}

// get genre by id
export async function getGenreById(id) {
  try {
    const response = await fetch(api("/genre/" + id));
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error fetching genre by ID:", err);
  }
  return null;
}
