import React from "react";
import Navbar from "../components/navbar";
import SimpleBottomNavigation from "../components/bottomNavigation";
import UploadForm from "../components/uploadForm";
import { Box } from "@mui/material";

const AddListing = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Box sx={{ pb: 10 }}>
        <UploadForm />
      </Box>
      <SimpleBottomNavigation />
    </React.Fragment>
  );
};

export default AddListing;
