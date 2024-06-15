import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >
          <div></div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notes app
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" color="inherit" onClick={()=>navigate("/create-note")}>
            Create Note
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
