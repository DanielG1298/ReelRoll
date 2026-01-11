import { useAuth } from "../auth/auth.jsx";
import { useNavigate } from "react-router-dom";
import "../CSS/login.css"

export default function LoginPage(){
const { login } = useAuth();
const navigate = useNavigate();

const tryLogin = async(event) =>{
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    await login({username, password});
    navigate("/account");
}

    return(
        <>
        <main className="login-page">
        <section className="login-card">
        <h1>Login to your account</h1>
        <form className="login-form"onSubmit={tryLogin}>
            <label className="username">
                Username
                <input className="login-input" type = "text" name="username" required/> 
            </label>
            <label className="password">
                Password <input className="login-input" type = "password" name="password" required/>
            </label>
            <button className="login-button">Login</button>
        </form>
        </section>
        </main>
        </>
    )
}