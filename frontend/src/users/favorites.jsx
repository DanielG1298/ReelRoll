import { getFavorites,removeFavorite } from "../api/favoritesApi"
import { useAuth } from "../auth/auth.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function FavoritesTab(){
    const navigate = useNavigate();
    const { token } = useAuth();
    const [ favorites, setFavorites ] = useState ([]);
    
    //fetch favorites
    useEffect(() =>{
        const fetchFavorites = async() =>{
            if(!token) return;
            const data = await getFavorites (token);  
            setFavorites(Array.isArray(data) ? data : []);
        }; fetchFavorites();
    }, [token]);
  
    
    return(
        <>
        <h2>Your Favorites</h2>
        {favorites.length === 0 ? (<p>No favorites added yet.</p>) : (
        <ul>
            {favorites.map((fav) =>(
                <li key={fav.id}
                    onClick = {() => navigate(`/movies/${fav.movie_id}`)} style={{ cursor: 'pointer' }}>
                    <h3>{fav.title}</h3>
                    <img src={fav.poster_url} alt={`${fav.title} poster`} />
                </li>
            ))} 
        </ul>
        )}
        </>
    )
}