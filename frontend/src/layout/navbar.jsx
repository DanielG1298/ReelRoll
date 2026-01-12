import { NavLink } from "react-router-dom";
import "./navbar.css"

export default function NavBar(){
    return(
    <>
    <header className="navbar"> 

        <div className="nav-left"/>
        
        <img
          src="reelRollLogo.png"
          alt="ReelRoll logo"
          className="logo"
        />
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