import { AppBar, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
    return(
        <AppBar position="static">
            <Toolbar>
                <Button color="inheret" LinkComponent={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" LinkComponent={Link} to="/usuarios">
                    Usuários
                </Button>
            </Toolbar>
        </AppBar>
    )
}