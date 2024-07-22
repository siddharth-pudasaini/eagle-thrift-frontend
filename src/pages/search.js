import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import SimpleBottomNavigation from "../components/bottomNavigation";
import Filters from "../components/filters";
import ScrollToTop from "../components/scrollButton";
import ContentArea from "../components/contentArea";
import ListingsContainer from "../components/listingsContainer";
import { TextField, Button, Box, Container } from "@mui/material";

const Search = () => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([0]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [listings, setListings] = useState([]);

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

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();
      selectedCategoryIds.forEach((id) => params.append("categories", id));
      params.append("sort_order", sortOrder);
      params.append("query", searchQuery);

      const response = await fetch(
        `http://localhost:8000/api/search?${params.toString()}`
      );
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          sx={{ display: "flex", alignItems: "center", my: 2 }}
        >
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ ml: 2 }}
          >
            Search
          </Button>
        </Box>
        <Filters
          selectedCategoryIds={selectedCategoryIds}
          sortOrder={sortOrder}
          onFilterChange={handleFilterChange}
        />
      </Container>
      <ContentArea>
        <ListingsContainer listings={listings} />
      </ContentArea>
      <ScrollToTop />
      <SimpleBottomNavigation />
    </>
  );
};

export default Search;
