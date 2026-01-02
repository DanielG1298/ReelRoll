

export default function HomePage(){
    return(
        <>
        <main className="home">
            <h2>Welcome to ReelRoll</h2>
            <p>
                Can't pick a movie? Let ReelRoll help you and get some random recommendations!
            </p>

        <section className="ReelRollRandomiser">
        <h2>ReelRoll Randomiser</h2>
        <p>select a genre or just hit random to get some recommendations</p>
        <button>Random Movie</button>
        

        </section>    
        </main>
        </>
    )
}