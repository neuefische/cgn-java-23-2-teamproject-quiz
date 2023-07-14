import React, {FormEvent, useState} from 'react';
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
type Props={
    onSignUp:(username: string, password: string)=>void
}
function SignUpPage(props:Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    function onSignUp(event:FormEvent){
        event.preventDefault()
        props.onSignUp(username, password)
    }
    return (
        <form onSubmit={onSignUp}>
            <TextField value={username} onChange={event => setUsername(event.target.value)} fullWidth size={"small"}
                       id="outlined-basic" label="Username" variant="outlined"/>
            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput onChange={event => setPassword(event.target.value)} value={password}
                               fullWidth
                               size={"small"}
                               id="outlined-adornment-password"
                               type={showPassword ? 'text' : 'password'}
                               endAdornment={
                                   <InputAdornment position="end">
                                       <IconButton
                                           aria-label="toggle password visibility"
                                           onClick={handleClickShowPassword}
                                           onMouseDown={handleMouseDownPassword}
                                           edge="end"
                                       >
                                           {showPassword ? <VisibilityOff/> : <Visibility/>}
                                       </IconButton>
                                   </InputAdornment>
                               }
                               label="Password"
                />
            </FormControl>
            <button>Sign-Up</button>
        </form>
    );
}

export default SignUpPage;