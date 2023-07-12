import {Link} from "react-router-dom";

type Props = {
    user? : string
}
function LandingPage(props: Props) {
    return (
        <main>
            <section>
                <h1>Welcome {props.user}!</h1>
                <p>Take a look at all our quizzes or start the game:</p>
            </section>
            <section className={"buttons-container"}>
                <Link to={"/all-quizzes"}>
                    <button className={"landing-button"}>All Quizzes</button>
                </Link>
                <Link to={"/game"}>
                    <button className={"landing-button"}>Start Game</button>
                </Link>
                <Link to={"/login"}>
                    <button className={"login-button"}>Login</button>
                </Link>
            </section>
        </main>
    );
}

export default LandingPage;
