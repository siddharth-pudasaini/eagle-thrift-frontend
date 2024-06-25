import Navbar from "../components/navbar";
import SimpleBottomNavigation from "../components/bottomNavigation";

import Filters from "../components/filters";
import ScrollToTop from "../components/scrollButton";

import ContentArea from "../components/contentArea";

import AccountInfo from "../components/accountInfo";

const Home = () => {
  return (
    <>
      <Navbar />
      <ContentArea>
        <AccountInfo />
      </ContentArea>
      <ScrollToTop />
      <SimpleBottomNavigation />
    </>
  );
};

export default Home;
