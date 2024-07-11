import Navbar from "../components/navbar";
import SimpleBottomNavigation from "../components/bottomNavigation";
import ScrollToTop from "../components/scrollButton";
import ContentArea from "../components/contentArea";
import AccountInfo from "../components/accountInfo";
import AlertDialog from "../components/alertDialog";
import { useContext} from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../providers/AuthProvider";

import { Box } from "@mui/material";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAlertClose = () => {
    navigate("/signIn");
  };
  return (
    <>
      <Navbar />
      <ContentArea>
        <Box sx={{ pb: 10 }}>
          {isAuthenticated && <AccountInfo />}
          {!isAuthenticated && (
            <AlertDialog
              open
              message="Please login to view accounts page"
              onClose={handleAlertClose}
              title="Authentication Error"
            />
          )}
        </Box>
      </ContentArea>
      <ScrollToTop />
      <SimpleBottomNavigation />
    </>
  );
};

export default Home;
