import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { getMovies } from "../api/movieApi.js";

export default function MoviesPage(){
const [movies, setMovies] = useState([]);
const navigate = useNavigate();

useEffect(() => {
    const fetchMovies = async () => {
        const data = await getMovies();
        console.log(data);
        setMovies(data);
    };
    fetchMovies();
},  []);


    return(
        <>
        <section>
            <h2>Movies</h2>
            <ul className="movies-list">
              <li key={movies.id}
              onClick={() => navigate(`/movies/${movies.id}`)}
              className="movie-card">
                <img src={movies.poster_url} alt={`${movies.title} movie-cover`}/>
                <div>
                    <h3>{movies.title}</h3>
                    <p>{movies.director}</p>
                </div>
              </li>  
            </ul>    
        </section>
        </>
    )
}