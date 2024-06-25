import Navbar from "../components/navbar";
import SimpleBottomNavigation from "../components/bottomNavigation";

import Filters from "../components/filters";
import ScrollToTop from "../components/scrollButton";

import ContentArea from "../components/contentArea";

const Home = () => {
  return (
    <>
      <Navbar />
      <Filters />
      <ContentArea />
      <ScrollToTop />
      <SimpleBottomNavigation />
    </>
  );
};

export default Home;
