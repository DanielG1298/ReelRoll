import { useEffect } from "react";
import { getGenres } from "../api/genreApi.js";

export default function genresList(){
   const [genres, setGenres] = useState([]);

   useEffect(() =>{
    const fetchGenres = async () => {
        const data = await getGenres();
        setGenres(data);
    }; fetchGenres();
   }, []
);
   
   
   
    return(
        <>
        <h1>Genres</h1>
        <ul>
            {genres.map((genres) => (
                <li key={genres.id}>{genres.name}</li>
            ))}
        </ul>
        </>
    )
}