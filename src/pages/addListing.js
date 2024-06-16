import React, { useContext } from "react";
import Navbar from "../components/navbar";
import SimpleBottomNavigation from "../components/bottomNavigation";
import UploadForm from "../components/uploadForm";
import { Box } from "@mui/material";

import { AuthContext } from "../providers/AuthProvider";
import AlertDialog from "../components/alertDialog";
import { useNavigate } from "react-router-dom";

const AddListing = () => {
  const { authToken, isAuthenticated, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAlertClose=()=>{
    navigate('/signIn')
  }

  return (
    <React.Fragment>
      <Navbar />
      <Box sx={{ pb: 10 }}>
        {isAuthenticated && <UploadForm />}
        {!isAuthenticated && (
          <AlertDialog
            open
            message="Please login to add listing"
            onClose={handleAlertClose}
            title="Authentication Error"
          />
        )}
      </Box>
      <SimpleBottomNavigation />
    </React.Fragment>
  );
};

export default AddListing;
