import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React, {FormEvent, useState} from "react";

type Props ={
    onLoginSubmit: (username: string, password: string) => void,
    loginSubmit: boolean,
}
export default function UserNamePasswordInput(props:Props){
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    function onSubmit(event: FormEvent) {
        event.preventDefault()
        props.onLoginSubmit(username, password)
    }

    return (
        <>
            <form className={"form-container"} onSubmit={onSubmit}>
                <TextField value={username} onChange={event => setUsername(event.target.value)} fullWidth size={"small"}
                           id="outlined-basic"
                           label="Username"
                           variant="outlined"/>
                <FormControl variant="outlined">
                    <InputLabel size={"small"} htmlFor="outlined-adornment-password">Password</InputLabel>
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
                {props.loginSubmit ? <button>Login</button> : <button>Submit</button>}
            </form>
        </>
    )
}
