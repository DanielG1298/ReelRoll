import { API } from "./const.js";

// fetch movies from api
export async function getMovies(){
    try{
        const response = await fetch ("/movies");
        const result = await response.json();
        return result;
}catch(error){
    console.error(error);
}return [];
}
// fetch movie by id 
export async function getMovieById(id){
    try{
        const response = await fetch ("/movies/" + id);
        const result = await response.json();
        return result;
    }catch(err){
        console.error(err);
    }return null;
}
// fetch movie by genre
export async function getMoviesByGenre(genre){
    try{
        const response = await fetch ("/movies/genre/" + genre);
        const result = await response.json();
        console.log(result);
        return result;
    }catch(err){
        console.error(err);
    }return [];
}
//fetch random movies
export async function getRandomMovies(){
    try{
        const response = await fetch ("/movies/random");
        const result = await response.json();
        return result;  
    }catch(err){
        console.error(err);
    }return [];
}
//fetch random movie by genre 
export async function GetRandomMoviesByGenre(genre){
    try{
        const response = await fetch ("/movies/random/genre/" + genre);
        const result = await response.json();
        console.log(result);
        return result;
        
    }catch(err){
        console.error(err);
    }return [];
}

