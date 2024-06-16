import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";
import CancelIcon from "@mui/icons-material/Cancel";
import useMediaQuery from "@mui/material/useMediaQuery";

const defaultDrawerWidth = "30vw";

export default function SimplePersistentDrawer() {
  const [open, setOpen] = useState(false);
  const isFullScreen = useMediaQuery("(max-width: 600px)");

  const toggleDrawer = () => {
    setOpen(!open);
  };


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{ display: !open ? "block" : "none" }}
      >
        <Badge badgeContent={4} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <Drawer
        sx={{
          display: open ? "block" : "none",
          width: isFullScreen ? "100vw" : defaultDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isFullScreen ? "100vw" : defaultDrawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          <Typography variant="h6" sx={{ ml: 2, color:'primary.main' ,fontWeight:"semiBold"}}>
            Messages
          </Typography>
          <IconButton onClick={toggleDrawer} sx={{ color: "red" }}>
            <CancelIcon />
          </IconButton>
        </Box>
      </Drawer>
    </Box>
  );
}
