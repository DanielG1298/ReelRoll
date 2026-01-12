import { NavLink } from "react-router-dom";
import "./navbar.css"
import reelRollLogo from "../logo/reelrolllogo.png"
export default function NavBar(){
    return(
    <>
    <header className="navbar"> 

        <div className="nav-left"/>
        
        <img
          src={reelRollLogo}
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