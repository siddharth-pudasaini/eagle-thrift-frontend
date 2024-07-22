import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import SimpleBottomNavigation from "../components/bottomNavigation";
import Filters from "../components/filters";
import ScrollToTop from "../components/scrollButton";
import ContentArea from "../components/contentArea";
import ListingsContainer from "../components/listingsContainer";

const Home = () => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([0]);
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const savedCategoryIds = JSON.parse(
      localStorage.getItem("selectedCategoryIds")
    );
    const savedSortOrder = localStorage.getItem("sortOrder");

    if (savedCategoryIds) {
      setSelectedCategoryIds(savedCategoryIds);
    }
    if (savedSortOrder) {
      setSortOrder(savedSortOrder);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "selectedCategoryIds",
      JSON.stringify(selectedCategoryIds)
    );
    localStorage.setItem("sortOrder", sortOrder);
  }, [selectedCategoryIds, sortOrder]);

  const handleFilterChange = ({ selectedCategoryIds, sortOrder }) => {
    setSelectedCategoryIds(selectedCategoryIds);
    setSortOrder(sortOrder);
  };

  return (
    <>
      <Navbar />
      <Filters
        selectedCategoryIds={selectedCategoryIds}
        sortOrder={sortOrder}
        onFilterChange={handleFilterChange}
      />
      <ContentArea>
        <ListingsContainer
          selectedCategoryIds={selectedCategoryIds}
          sortOrder={sortOrder}
        />
      </ContentArea>
      <ScrollToTop />
      <SimpleBottomNavigation />
    </>
  );
};

export default Home;
