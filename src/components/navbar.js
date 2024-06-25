import React,{useContext} from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ChatIcon from "@mui/icons-material/Chat";


import SimplePersistentDrawer from "./drawer";

import { UIContext } from "../providers/UIprovider";


export default function Navbar() {
  const { drawerOpen, toggleDrawer } = useContext(UIContext);
  return (
    <AppBar
      
      className="navbar"
      sx={{
        padding: "1vh",
        position:"sticky",
        top:0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // To space the items horizontally
        minHeight: "8vh",
      }}
    >
      <Typography variant="h5" className="title">
        Eagle Thrift
      </Typography>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{ display: !drawerOpen ? "block" : "none" }}
      >
        <Badge badgeContent={4} color="secondary">
          <ChatIcon />
        </Badge>
      </IconButton>
      <SimplePersistentDrawer />
    </AppBar>
  );
}
