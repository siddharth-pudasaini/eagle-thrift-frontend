import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./navbar.css";


function Navbar() {
  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className="menu-button"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="title">
          Eagle Thrift
        </Typography>
  
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
