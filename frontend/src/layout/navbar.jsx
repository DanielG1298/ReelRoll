import { NavLink } from "react-router-dom";

export default function NavBar(){
    return(
    <>
    <header>
        <h1>ReelRoll</h1>
        <nav>
            <NavLink to='/'>Home</NavLink>
            <navLink to='/movies'>Movies</navLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/register'>Register</NavLink>
            <NavLink to='/account'>Account</NavLink>
        </nav>
    </header>
    </>
    )
}