import { getMovieById } from "../api/movieApi.js";
import {useState,useEffect} from "react";
import { useParams,} from "react-router";
//shows the details of the selected movie//

export default function MovieDetails(){
const [movies, setMovies] = useState();
const { id } = useParams();
const { token, addFav } = useAuth();
//const [ isFav, setFav ] = useState(false);     

useEffect(()=>{
    const fetchMovie = async ()=>{
        const data = await getMovieById(id);
        setMovies(data);
        if (data?.isFav || data?.setFav){
            setFav(true);
        }
    };fetchMovie();
},  [id]
);

    return(
        <>
        <div key={moviesPage.id} >
            <h1>Movie Details</h1>
            <img className="details-cover" src={movies.poster_url} alt={`${movies.title} poster`}/>
            <h2>{movies.title} </h2>
            <p>{movies.description}</p>
            <h3>{movies.release_date}</h3>
            <h3>{movies.genre}</h3>
            <h3>{movies.duration} minutes</h3>
        </div>
        
        
        </>
    )
}