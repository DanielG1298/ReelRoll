import { getMovieById } from "../api/movieApi.js";
import {useState,useEffect} from "react";
import { useParams} from "react-router-dom";
//shows the details of the selected movie//

export default function MovieDetails(){
const [movies, setMovies] = useState(null);
const { id } = useParams();
//const { token, addFav } = useAuth();
//const [ isFav, setFav ] = useState(false);     

useEffect(()=>{
    const fetchMovie = async ()=>{
        const data = await getMovieById(id);
        setMovies(data);
        console.log("Movie details:", data);
        if (data?.isFav || data?.setFav){
            setFav(true);
        }
    };fetchMovie();
},  [id]
);
if (!movies) return <p>Loading...</p>;

    return(
        <>
        <div>
            <h1>Movie Details</h1>
            <img className="details-cover" src={movies.poster_url} alt={`${movies.title} poster`}/>
            <h2>{movies.title} </h2>
            <p>{movies.description}</p>
            <h3>{movies.release_date}</h3>
            <h3>{movies.genre}</h3>
            <h3>{movies.duration_minutes} minutes</h3>
        </div>
        
        
        </>
    )
}