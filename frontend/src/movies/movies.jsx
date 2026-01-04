import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { getMovies, getMoviesByGenre } from "../api/movieApi.js";
import { getGenres} from "../api/genreApi.js";
export default function MoviesPage(){
const [movies, setMovies] = useState([]);
const [genres, setGenres] = useState([]);
const [selectedGenre, setSelectedGenre] = useState("");
const navigate = useNavigate();

//fetch genres

useEffect(() =>{
    const fetchGenres = async () => {
    const data = await getGenres();
    setGenres((data) ? data : []);
    };fetchGenres();
}, []);
//fetch movies when genres change
useEffect (() => {
    const fetchMoviesByGenre = async () =>{
        const data = selectedGenre 
        ? await getMoviesByGenre(selectedGenre) 
        : await getMovies();
         console.log("movies response:", data);
        setMovies(Array.isArray(data) ? data : (data?.movies ??[]));
    };
    fetchMoviesByGenre();
}, 
[selectedGenre]);



    return(
        <>
        <section>
            <h2>Movies</h2>
            <div>
            <label>
                Filter by Genre:{" "}
                <select value={selectedGenre}
                onChange={(event) => setSelectedGenre(event.target.value)}>
                <option value="">All</option>
                {genres.map((genre) =>(
                    <option key={genre.id} value={genre.id}>{genre.name}</option> 
                ))}
                </select>
            </label>
            </div>
            <ul className="movie-list">
                {movies.map((movie) => (
                    <li className="movie-card" key={movie.id}
                    onClick={() => navigate(`/movies/${movie.id}`)} >
                    <img src={movie.poster_url} alt={`${movie.title} poster`}/>
                <h3>{movie.title}</h3>
                <p>{movie.director}</p>
                </li>
                ))}
                </ul>                
                
        </section>
        </>
    )
}