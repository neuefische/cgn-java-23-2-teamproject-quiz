import {FormHelperText} from "@mui/material";
import UserNamePasswordInput from "./UserNamePasswordInput.tsx";
import {Link} from "react-router-dom";

type Props = {
    onLogin: (username: string, password: string) => void
    user?: string
}

function LoginPage(props: Props) {
    return (<>
            <UserNamePasswordInput onLoginSubmit={props.onLogin} loginSubmit = {true}/>
            <FormHelperText>You don't have an account? <Link to={"/sign-up"}>Sign-Up here!</Link></FormHelperText>
        </>
    );
}

export default LoginPage;
