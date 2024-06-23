import React, { useContext } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import ChatIcon from "@mui/icons-material/Chat";
import CancelIcon from "@mui/icons-material/Cancel";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";
import MessageList from "./messageList";

import { UIContext } from "../providers/UIprovider";

const defaultDrawerWidth = "30vw";

export default function SimplePersistentDrawer() {
  const isFullScreen = useMediaQuery("(max-width: 600px)");

  const { drawerOpen, toggleDrawer } = useContext(UIContext);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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
      <Drawer
        sx={{
          display: drawerOpen ? "block" : "none",
          width: isFullScreen ? "100vw" : defaultDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isFullScreen ? "100vw" : defaultDrawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="right"
        open={drawerOpen}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{ ml: 2, color: "primary.main", fontWeight: "bold" }}
          >
            Messages
          </Typography>
          <IconButton onClick={toggleDrawer} sx={{ color: "#a81d1d" }}>
            <CancelIcon />
          </IconButton>
        </Box>
        <Divider />
        <MessageList />
      </Drawer>
    </Box>
  );
}
