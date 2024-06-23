import React, { useState, useEffect, useContext } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { UIContext } from "../providers/UIprovider";

export default function BasicChips() {
  const [open, setOpen] = useState(false);

  const { drawerOpen, toggleDrawer } = useContext(UIContext);

  useEffect(() => {
    const savedOpenState = sessionStorage.getItem("drawerOpen");
    console.log(savedOpenState);
    if (savedOpenState === "true") {
      setOpen(true);
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: "8vh",
          visibility: drawerOpen ? "none" : "flex",
          flexDirection: "column",
          maxWidth: "100%",
          minHeight: "6vh",
          width: "auto",
          zIndex: 1100,
          overflowX: "scroll",
          paddingBottom: "0.1%", // Add padding to the bottom for the scrollbar
          scrollbarWidth: "thin",
          scrollbarColor: "#596e5a #f0f0f0",
          background: "none",
          margin: "1vh",
          transition:'ease-in',
          transitionDelay:'5s'
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            color: "primary.main",
            maxWidth: "100%",
            marginBottom: "0.5%",
          }}
        >
          <Chip label="All" color="primary" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
          <Chip label="Chip Outlined" variant="outlined" />
        </Stack>
      </Box>
    </>
  );
}
