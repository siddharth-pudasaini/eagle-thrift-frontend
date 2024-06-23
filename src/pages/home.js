import Navbar from "../components/navbar";
import SimpleBottomNavigation from "../components/bottomNavigation";

import BasicChips from "../components/categoriesSlide";
import { Typography } from "@mui/material";

const Home = () => {
  return (
    <>
      <Navbar />
      <BasicChips />
      
      <SimpleBottomNavigation />
    </>
  );
};

export default Home;
