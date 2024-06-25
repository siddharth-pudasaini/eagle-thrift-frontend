import React from "react";
import Navbar from "../components/navbar";
import SimpleBottomNavigation from "../components/bottomNavigation";

import Filters from "../components/filters";
import SearchBar from "../components/searchBar";
import ContentArea from "../components/contentArea";
import { Box } from "@mui/material";

import ScrollToTop from "../components/scrollButton";


const Search = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Box sx={{display:'flex',alignItems:'center',flexWrap:'wrap'}}>
        <SearchBar />
        <Filters />
      </Box>

      <ContentArea />
      <SimpleBottomNavigation />
    </React.Fragment>
  );
};

export default Search;
