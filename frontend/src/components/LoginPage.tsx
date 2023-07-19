import {FormHelperText, IconButton} from "@mui/material";
import UserNamePasswordInput from "./UserNamePasswordInput.tsx";
import {Link} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";

type Props = {
    onLogin: (username: string, password: string) => void
    user?: string
}

function LoginPage(props: Props) {
    return (<>
            <Link to={"/"}>
                <IconButton className={"back-button-login"} color={"secondary"}>
                    <ArrowBack/>
                </IconButton>
            </Link>
            <section className={"login-form-container"}>
                <UserNamePasswordInput onLoginSubmit={props.onLogin} loginSubmit = {true}/>
            </section>
            <FormHelperText>You don't have an account? Just use our <Link to={"/sign-up"}>Sign-Up!</Link></FormHelperText>
        </>
    );
}

export default LoginPage;
