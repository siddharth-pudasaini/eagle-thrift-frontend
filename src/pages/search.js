import React from "react";
import Navbar from "../components/navbar";
import SimpleBottomNavigation from "../components/bottomNavigation";
import AccountInfo from "./account";

const Search = () => {
  return (
    <React.Fragment>
      <Navbar />
      <AccountInfo/>
      <SimpleBottomNavigation />
    </React.Fragment>
  );
};

export default Search;
