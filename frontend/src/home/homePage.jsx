import Randomiser from "./randomiser.jsx";
import "../CSS/homePage.css"
export default function HomePage(){
    return(
        <>
        <main className="home">
            <h2>Welcome to ReelRoll</h2>
            <p>
                Can't pick a movie? Let ReelRoll help you and get some random recommendations!
            </p>

        <Randomiser />
            
        </main>
        </>
    )
}