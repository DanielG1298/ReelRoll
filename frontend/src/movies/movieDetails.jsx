import { getMovieById } from "../api/movieApi.js";
import {addFavorite, getFavorites, removeFavorite} from "../api/favoritesApi.js";
import {useState,useEffect} from "react";
import { useAuth } from "../auth/auth.jsx";
import { useParams} from "react-router-dom";
import  ReviewsTab  from "../reviews/reviews.jsx";
//shows the details of the selected movie//

export default function MovieDetails(){
const [movies, setMovies] = useState(null);
const { id } = useParams();
const { token, addFav } = useAuth();
const [ isFav, setFav ] = useState(false);     

useEffect(()=>{
    const fetchMovie = async ()=>{
        const data = await getMovieById(id);
        setMovies(data);
        
        
    };fetchMovie();
},  [id]

);

//check if movie is in favorites
useEffect(() => {
if (!token || !id) return;

const checkFav= async () => {
    const favs = await getFavorites(token);
    const isFavorite = favs.some(fav => String(fav.movie_id) === String(id));
    setFav(isFavorite)
}; checkFav();
}, [token, id]);

//favorite handler
const FavoriteHandler = async () =>{
    if (!token || !movies) return;
    try{
        if(isFav){
            await removeFavorite(token, movies.id);
            setFav(false);
        } else { 
            await addFavorite (token, movies.id);
            setFav(true);
        }
    }catch(err){
        console.error("Failed to add favorite:", err);
    }
}


if (!movies) return <p>Loading...</p>;

    return(
        <>
        <div>
            <h1>Movie Details</h1>
            <img className="details-cover" src={movies.poster_url} alt={`${movies.title} poster`}/>
            <h2>{movies.title} </h2>
            <p>{movies.description}</p>
            <h3>{movies.release_year}</h3>
            <h3>{movies.genre}</h3>
            <h3>{movies.duration_minutes} minutes</h3>
        </div>
        <div>
            {token ? (
                <button onClick={FavoriteHandler}>
                {isFav ? "Remove from Favorites" : "Add to Favorites"}
                </button>) : (<p>Login to manage favorites</p>
            )}
        </div>
        <div>
        <ReviewsTab movieId ={id}/>
        </div>
        
        </>
    )
}