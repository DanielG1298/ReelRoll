import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { getMovies } from "../api/movieApi.js";

export default function moviesPage(){
const [movie, setMovie] = useState([]);
const navigate = useNavigate();

useEffect(() => {
    const fetchMovies = async () => {
        const data = await getMovies();
        console.log(data);
        setMovie(data);
    };
    fetchMovies();
},  []);


    return(
        <>
        <section>
            <h2>Movie</h2>
            <ul classname="book-list">
              <li key={movie.id}
              onClick={() => navigate(`/movies/${movie.id}`)}
              className="movie-card">
                <img src={movie.poster_url} alt={`${movie.title} movie-cover`}/>
                <div>
                    <h3>{movie.title}</h3>
                    <p>{movie.director}</p>
                </div>
              </li>  
            </ul>    
        </section>
        </>
    )
}