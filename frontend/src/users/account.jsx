import { useAuth } from "../auth/auth.jsx";
import { useState, useEffect } from "react";

export default function AccountPage(){
    const { token, account, logout, reservations, removeFavorites } = useAuth();
    const [user, setUser] = useState(null);
    const [ favorites, setFavorites ] = useState([]);

    //function top fetch account 
    
    useEffect(() => {
        const fetchAccount = async() =>{
            try{
            const data = await account();
            console.log("Account data:", data);
            setUser(data);
            
    //favorites data fetch 
    const favoritesData = await favorites();
    console.log("Favorites data:", favoritesData);
    setFavorites(favoritesData);

            }catch(err){
                console.error("Error", err);
            }
        };
        if (token) fetchAccount();
    }, [token]);
    


    //logout handler
    const handleLogout = () => {
        logout();
        Navigate("/login");
    }
    return(
        <>
        <h1>Account Details</h1>
        </>
    )
}