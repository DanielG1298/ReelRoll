import { useState } from "react"
import { useAuth } from "../auth/auth.jsx";
import { useNavigate } from "react-router";
import "../CSS/register.css"

export default function registerPage(){
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error,setError] = useState();
    const tryRegister = async (event) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    try{
        await register({username,email,password});
        console.log("Register() finished"); 
        navigate("/account");
    }catch(err){
        setError(err.message);
    }   
};
    
    
    return(
        <>
        <main className="register-page">
        <section className="register-card">
        <h1 className="register-title">Register New Account</h1>
        <form className="register-form" onSubmit={tryRegister}>
        <label className="register-label">
        Username
        <input className="register-input"type="text" name="username" required/>
        </label>
        <label className="register-label">
        Email<input className="register-input" type="text" name="email" required/>
        </label>
        <label className="register-label">
        Password<input className="register-input" type="password" name="password" required/>
        </label>
        <button className="register-button">Register</button>    
        </form>
        </section>
        </main>
        </>
    )
}