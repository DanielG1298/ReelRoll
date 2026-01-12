import Randomiser from "./randomiser.jsx";
import "../CSS/homePage.css"
import reelRollLogo from "../logo/reelrolllogo.png"
export default function HomePage(){
    return(
        <>
        <main className="home">
            <h2>Welcome to ReelRoll</h2>
            <img className="home-logo" src={reelRollLogo} alt="ReelRoll logo"/>
            <p>
                Can't pick a movie? Let ReelRoll help you and get some random recommendations!
            </p>

        <Randomiser />
            
        </main>
        </>
    )
}