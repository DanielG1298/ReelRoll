import { NavLink } from "react-router-dom";
import "./navbar.css"
export default function NavBar(){
    return(
    <>
    <header className="navbar"> 

        <div className="nav-left"/>
        
        <h1 className="title">ReelRoll</h1>
        <nav className="navlinks">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/movies'>Movies</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/register'>Register</NavLink>
            <NavLink to='/account'>Account</NavLink>
        </nav>
    </header>
    </>
    )
}