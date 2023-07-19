import {Link} from "react-router-dom";
import {useEffect} from "react";
import {ToastContainer} from "react-toastify";

type Props = {
    user? : string
    signedIn : ()=>void
    onLogout: ()=>void
}
function LandingPage(props: Props) {
    useEffect(props.signedIn, [])

    return (
        <main className={"main-landing-page"}>
            <section>

                <h1>Welcome{props.user !== undefined && props.user!== "anonymousUser"
                    ?
                ", " + props.user + "."
                    : null
                }</h1>
                <p>Take a look at all our quizzes or start the game:</p>
            </section>
            <section className={"buttons-container"}>
                <Link to={"/all-quizzes"}>
                    <button className={"landing-button"}>All Quizzes</button>
                </Link>
                <Link to={"/game"}>
                    <button className={"landing-button"}>Start Game</button>
                </Link>
                {props.user !== undefined && props.user!== "anonymousUser" ? (
                    <button onClick={props.onLogout}  className={"logout-button"}>Logout</button>

            ) : (<Link to={"/login"}>
                    <button className={"login-button"}>Login</button>
                </Link>)}

            </section>
            <ToastContainer/>
        </main>
    );
}

export default LandingPage;
