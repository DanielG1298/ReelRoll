import { useAuth } from "../auth/auth.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import FavoritesTab from "./favorites.jsx";
export default function AccountPage(){
    const { token, account, logout, } = useAuth();
    

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
    

            }catch(err){
                console.error("Error", err);
            }
        };
        if (token) fetchAccount();
    }, [token]);
    


    //logout handler
    const handleLogout = () => {
        logout();
        useNavigate("/login");
    }

    //loading state 
     if (!token) return <p>Please log in to view account details.</p>;
     if (!user) return <p>Loading account details...</p>;
   

    return(
        <>
        <h1>Account Details</h1>
        <h2>{user.username}</h2>
        <h2>{user.email}</h2>
        <button onClick={handleLogout}>Logout</button>
        <FavoritesTab />
        </>
    )
}