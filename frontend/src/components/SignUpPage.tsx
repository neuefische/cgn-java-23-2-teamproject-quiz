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
            <Link to={"/"}>
                <IconButton className={"back-button-login"} color={"secondary"}>
                    <ArrowBack/>
                </IconButton>
            </Link>
            <UserNamePasswordInput onLoginSubmit={props.onSignUp} loginSubmit={false}/>
        </>
    );
}
export default SignUpPage;
