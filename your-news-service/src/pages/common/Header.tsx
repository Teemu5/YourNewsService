import {Link, useHistory} from "react-router-dom";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";

const Header = () => {
    const history = useHistory();

    return (
        <Box sx={{flexGrow: 1,}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{flexGrow: 1, cursor: "pointer",}}
                                onClick={() => history.push('/')}
                    >Your News Service</Typography>
                    <Button component={Link} to="/statistics" color="inherit">Statistics</Button>
                    <Button component={Link} to="/categories" disabled color="inherit">Categories</Button>
                    <Button component={Link} to="/logout" disabled color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;
