import UserNamePasswordInput from "./UserNamePasswordInput.tsx";
type Props={
    onSignUp:(username: string, password: string)=>void
}
function SignUpPage(props:Props) {
    return (
        <>
            <UserNamePasswordInput onLoginSubmit={props.onSignUp} loginSubmit={false}/>
        </>
    );
}
export default SignUpPage;
