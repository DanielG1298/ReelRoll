import { useAuth } from "../auth/auth.jsx";
import { useNavigate } from "react-router-dom";

export default function loginPage(){
const { Login } = useAuth();
const navigate = useNavigate();

const tryLogin = async(event) =>{
    event.preventDefualt();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    await Login({username, password});
    navigate("/account");
}

    return(
        <>
        <h1>Login to your account</h1>
        <form onSubmit={tryLogin}>
            <label>
                Username
                <input type = "text" name="username" required/> 
            </label>
            <label>
                Password<input type = "password" name="password" required/>
            </label>
        </form>
        </>
    )
}