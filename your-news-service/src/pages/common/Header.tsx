import {Link, useHistory} from "react-router-dom";
import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import LoginDialog from "../LoginDialog";
import {Auth} from "aws-amplify";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {doLogout, updateAuth} from "../../state/app-slice";

const Header = () => {
    const history = useHistory();
    const {auth} = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        // Try to refresh auth from storage after page reload
        const x = async () => {
            try {
                const res = await Auth.currentAuthenticatedUser();
                dispatch(updateAuth({
                    username: res.username,
                    email: res.attributes.email,
                    accessToken: res.signInUserSession.accessToken.jwtToken,
                    refreshToken: res.signInUserSession.refreshToken.token,
                }));
            } catch (e) {/* no need to anything since we just aren't logged in */
            }
        }
        x();
    }, [dispatch]);

    useEffect(() => {
        setIsLoggedIn(!!auth.username);
    }, [auth.username]);

    const handleClose = () => {
        setIsLoginOpen(false);
    };

    const logout = async () => {
        await Auth.signOut();
        dispatch(doLogout());
    }

    return (
        <Box sx={{flexGrow: 1,}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{flexGrow: 1, cursor: "pointer",}}
                                onClick={() => history.push('/')}
                    >Your News Service</Typography>
                    <Button component={Link} to="/statistics" color="inherit">Statistics</Button>
                    <Button component={Link} to="/categories" disabled color="inherit">Categories</Button>
                    {isLoggedIn && <Button onClick={() => logout()} color="inherit">Logout</Button>}
                    {!isLoggedIn && <Button onClick={() => setIsLoginOpen(true)} color="inherit">Login</Button>}
                </Toolbar>
            </AppBar>
            <LoginDialog handleClose={handleClose} isOpen={isLoginOpen}/>
        </Box>
    )
}

export default Header;
