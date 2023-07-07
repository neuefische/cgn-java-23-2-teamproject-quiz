import {Link} from "react-router-dom";

function LandingPage() {
    return (
        <main>
            <section>
                <h1>Welcome!</h1>
                <p>Take a look at all our quizzes or start the game:</p>
            </section>
            <section>
                <Link to={"/all-quizzes"}>
                    <button className={"landing-button"}>All Quizzes</button>
                </Link>
                <Link to={"/game"}>
                    <button className={"landing-button"}>Start Game</button>
                </Link>
            </section>
        </main>
    );
}

export default LandingPage;