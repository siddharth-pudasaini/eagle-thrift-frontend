import React from "react";
import Navbar from "../components/navbar";
import SimpleBottomNavigation from "../components/bottomNavigation";
import UploadForm from "../components/uploadForm";

const AddListing = () => {
  return (
    <React.Fragment>
      <Navbar />
      <UploadForm />
      <SimpleBottomNavigation />
    </React.Fragment>
  );
};

export default AddListing;
