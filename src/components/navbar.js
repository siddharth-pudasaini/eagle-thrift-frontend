import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

import SimplePersistentDrawer from "./drawer";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      className="navbar"
      sx={{
        padding: "1vh",
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
      <SimplePersistentDrawer />
    </AppBar>
  );
}
