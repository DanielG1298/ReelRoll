import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomMoviesByGenre, getRandomMovies } from "../api/movieApi.js";
import { getGenres } from "../api/genreApi.js";
import "./randomiser.css"

export default function Randomiser(){
const navigate = useNavigate();
const [random, setRandom] = useState([]);
const [genres, setGenres] = useState([]);
const [selectedGenre, setSelectedGenre] = useState("");
const [reqCount, setReqCount] = useState(3);
//loads genre for dropdown menu 
useEffect(() =>{
    const fetchGenres = async () =>{
        const data = await getGenres();
        
        setGenres(data);
    };fetchGenres();
}, []);

// randomise handler

async function handleRandomise(count){
setReqCount(count);

try{
    const data = selectedGenre ? await getRandomMoviesByGenre(selectedGenre)
    : await getRandomMovies();
    setRandom(data);
}catch(err){
    console.error("Error fetching random movies:", err);
    setRandom([]);
}
}
//displayed movie count 
const displayed = random.slice(0, reqCount);

    return(
        <>
        <section className="ReelRollRandomiser">
            <h2>ReelRollRandomsier</h2>
            <p>select a genre or just hit random to get some recommendations</p>

            <div className ="randomiserControls">
                <label>
                    Genre:
                    <select value = {selectedGenre}
                    onChange={(event) => setSelectedGenre(event.target.value)}>
                        <option value="">All Genres</option>
                        {genres.map((genre) =>(
                            <option key = {genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>
                </label>

            </div>
            <div className="randomiserButtons">
                <button type="button" onClick={() => handleRandomise(1)}>1</button>
                <button type="button" onClick={() => handleRandomise(2)}>2</button> 
                <button type="button" onClick={() => handleRandomise(3)}>3</button>
            </div>
             
            <div className="RandomResults">
                {displayed.map((movies) => (
                    <div key={movies.id}
                     className="randomMovieCard"
                      onClick={() => navigate(`/movies/${movies.id}`)}>
                    <img src ={movies.posterUrl} alt={movies.title} />
                    <h3>{movies.title}</h3>
                    </div>
                ))}
            </div>
                
        </section>
        </>
    )
}