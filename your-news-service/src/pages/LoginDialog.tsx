import {
    Box, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {Auth} from "aws-amplify";
import {useAppDispatch} from "../state/store";
import {updateAuth} from "../state/app-slice";

const LoginDialog = (props: { handleClose: () => void, isOpen: boolean }) => {
    const {handleClose, isOpen} = props;
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [confirmation, setConfirmation] = useState<string>("");

    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [isConfirm, setIsConfirm] = useState<boolean>(false);

    const handleUsernameChange = ({target}: ChangeEvent<HTMLInputElement>) => {
        setUsername(target.value);
    }

    const handleEmailChange = ({target}: ChangeEvent<HTMLInputElement>) => {
        setEmail(target.value);
    }

    const handleConfirmationChange = ({target}: ChangeEvent<HTMLInputElement>) => {
        setConfirmation(target.value);
    }

    const handlePasswordChange = ({target}: ChangeEvent<HTMLInputElement>) => {
        setPassword(target.value);
    }

    const handlePassword2Change = ({target}: ChangeEvent<HTMLInputElement>) => {
        setPassword2(target.value);
    }

    const handleLogin = async () => {
        try {
            const user = await Auth.signIn(username, password);
            dispatch(updateAuth({
                username: user.username,
                email: user.attributes.email,
                accessToken: user.signInUserSession.accessToken.jwtToken,
                refreshToken: user.signInUserSession.refreshToken.token,
            }));
            handleClose();
        } catch (e: any) {
            if (e.name === 'UserNotConfirmedException') {
                setIsLogin(false);
                setIsSignUp(false);
                setIsConfirm(true);
            }
            console.error(e);
        }
    }

    const canSignUp = (): boolean => {
        return password === password2 && username.length > 0 && isPwdValid(password);
    }

    const isPwdValid = (pwd: string): boolean => {
        return pwd.length >= 10;
    }

    const handleSignUp = async () => {
        if (!canSignUp()) return;
        try {
            await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                }
            })
            setIsSignUp(false);
            setIsConfirm(true);
        } catch (e: any) {
            if (e.name === 'UsernameExistsException') await handleLogin()
        }
    }

    const handleConfirm = async () => {
        await Auth.confirmSignUp(username, confirmation);
        await handleLogin();
    }

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    {(isLogin || isSignUp) && <FormControl style={{margin: "1rem",}}>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <OutlinedInput
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            label="Username"
                        />
                    </FormControl>}
                    {isSignUp && <FormControl style={{margin: "1rem",}}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            label="Email"
                        />
                    </FormControl>}
                    {(isLogin || isSignUp) && <FormControl style={{margin: "1rem",}}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            label="Password"
                        />
                    </FormControl>}
                    {isSignUp && <FormControl style={{margin: "1rem",}}>
                        <InputLabel htmlFor="password2">Password again</InputLabel>
                        <OutlinedInput
                            type="password"
                            id="password2"
                            value={password2}
                            onChange={handlePassword2Change}
                            label="Password again"
                        />
                    </FormControl>}
                    {isConfirm && <FormControl style={{margin: "1rem",}}>
                        <InputLabel htmlFor="confirmation">Confirmation</InputLabel>
                        <OutlinedInput
                            id="confirmation"
                            value={confirmation}
                            onChange={handleConfirmationChange}
                            label="Confirmation"
                        />
                    </FormControl>}
                </Box>
                {!isSignUp && <Button onClick={() => {
                    setIsSignUp(true);
                    setIsLogin(false);
                }} variant="text">No account? Sign up!</Button>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {isLogin && <Button onClick={handleLogin}>Login</Button>}
                {isSignUp && <Button disabled={!canSignUp()} onClick={handleSignUp}>Sign up</Button>}
                {isConfirm && <Button onClick={handleConfirm}>Confirm</Button>}
            </DialogActions>
        </Dialog>
    )
}

export default LoginDialog;
