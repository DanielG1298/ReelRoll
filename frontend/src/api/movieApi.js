import { api } from "./client.js";

// fetch movies from api
export async function getMovies() {
  try {
    const response = await fetch(api("/movies"));
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
  return [];
}

// fetch movie by id
export async function getMovieById(id) {
  try {
    const response = await fetch(api("/movies/" + id));
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
  return null;
}

// fetch movie by genre
export async function getMoviesByGenre(genre) {
  try {
    const response = await fetch(api("/movies/genre/" + genre));
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
  return [];
}

// fetch random movies
export async function getRandomMovies() {
  try {
    const response = await fetch(api("/movies/random"));
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
  return [];
}

// fetch random movie by genre
export async function getRandomMoviesByGenre(genre) {
  try {
    const response = await fetch(api("/movies/random/genre/" + genre));
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
  return [];
}
