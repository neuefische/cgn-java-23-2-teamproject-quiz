import UserNamePasswordInput from "./UserNamePasswordInput.tsx";
import {IconButton} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {Link} from "react-router-dom";
type Props={
    onSignUp:(username: string, password: string)=>void
}
function SignUpPage(props:Props) {
    return (
        <>
            <Link to={"/login"}>
                <IconButton className={"back-button-sign-up"} color={"secondary"}>
                    <ArrowBack/>
                </IconButton>
            </Link>
            <h3>Sign-up:</h3>
            <UserNamePasswordInput onLoginSubmit={props.onSignUp} loginSubmit={false}/>
        </>
    );
}
export default SignUpPage;
