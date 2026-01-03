import { useState } from "react"
import { useAuth } from "../auth/auth.jsx";
import { useNavigate } from "react-router";

export default function registerPage(){
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error,setError] = useState();
    const tryRegister = async (event) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.target);
    const userName = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    try{
        await register({userName,email,password});
        console.log("Register() finished"); 
        navigate("/account");
    }catch(err){
        setError(err.message);
    }   
};
    
    
    return(
        <>
        <h1>Register New Account</h1>
        <form onSubmit={tryRegister}>
        <label>
        username
        <input type="text" name="usrname" required/>
        </label>
        <label>
        email<input type="text" name="email" required/>
        </label>
        <label>
        password<input type="password" name="password" required/>
        </label>    
        </form>
        </>
    )
}