import React from "react";

import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1">404 Page not Found</Typography>
    </Container>
  );
};

export default NotFound;
