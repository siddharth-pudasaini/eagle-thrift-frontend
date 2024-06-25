import React, { useContext } from "react";
import Navbar from "../components/navbar";
import SimpleBottomNavigation from "../components/bottomNavigation";
import UploadForm from "../components/uploadForm";
import { Box } from "@mui/material";

import { AuthContext } from "../providers/AuthProvider";
import AlertDialog from "../components/alertDialog";
import { useNavigate } from "react-router-dom";

import ContentArea from "../components/contentArea";
import ScrollToTop from "../components/scrollButton";

const AddListing = () => {
  const { authToken, isAuthenticated, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAlertClose = () => {
    navigate("/signIn");
  };

  return (
    <React.Fragment>
      <Navbar />
      <ContentArea>
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
      </ContentArea>

      <SimpleBottomNavigation />
      <ScrollToTop />
    </React.Fragment>
  );
};

export default AddListing;
