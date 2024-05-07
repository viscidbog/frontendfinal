import { Link, Outlet } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";

function App() {
  // menu opening/closing functionality
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={handleClick}
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              align="left"
              sx={{ flexGrow: 1 }}
            >
              Personal Trainer
            </Typography>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                component={Link}
                to={("/", "/home")}
              >
                Home
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/customerlist"
              >
                Customer List
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/traininglist"
              >
                Training List
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/calendar">
                Calendar
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/chart">
                Chart
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Outlet />
      </Box>
    </>
  );
}

export default App;
