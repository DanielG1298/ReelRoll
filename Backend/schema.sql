DROP TABLE IF EXISTS movie_genre;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS genre;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;

/* tables for Db schema */

CREATE TABLE users(
id SERIAL PRIMARY KEY,
username TEXT NOT NULL UNIQUE,
email TEXT NOT NULL UNIQUE,
password_hash TEXT NOT NULL 
);

CREATE TABLE movies(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    release_year INTEGER NOT NULL,
    duration_minutes INTEGER NOT NULL,
    director TEXT NOT NULL,
    poster_url TEXT
);

CREATE TABLE genre(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE favorites(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    movie_id INTEGER NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    UNIQUE (user_id, movie_id)
);


CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    movie_id INTEGER NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 10),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (user_id, movie_id)
);


CREATE TABLE movie_genre(
    movie_id INTEGER NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    genre_id INTEGER NOT NULL REFERENCES genre(id) ON DELETE CASCADE,
    PRIMARY KEY (movie_id, genre_id)
);

