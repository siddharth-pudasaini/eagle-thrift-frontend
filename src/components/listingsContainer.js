import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box,useMediaQuery } from "@mui/material";
import MediaCard from "./mediaCard";


const ListingsContainer = ({ selectedCategoryIds, sortOrder }) => {
  const [listings, setListings] = useState([]);
  const isMobile = useMediaQuery("(max-width: 600px)");


  useEffect(() => {
    const fetchListings = async () => {
      try {
        const params = new URLSearchParams();
        selectedCategoryIds.forEach((id) => params.append("categories", id));
        params.append("sort_order", sortOrder);

        const response = await axios.get("http://127.0.0.1:8000/api/listings", {
          params,
        });
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [selectedCategoryIds, sortOrder]);

  const getReadableDate = (date) => {
    const cleanDateString = date.replace(/\.\d+/, "");
    return new Date(cleanDateString).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent:isMobile?"center":'flex-start',
        flexWrap: "wrap",
        gap: "2%",
      }}
    >
      {listings.map((listing) => (
        <MediaCard
          key={listing.id}
          media={
            listing.images && listing.images.length > 0
              ? listing.images.map((image) => ({ image }))
              : [{ image: "https://via.placeholder.com/150" }]
          }
          title={listing.title}
          dateListed={getReadableDate(listing.created_at)}
          description={listing.description}
          price={listing.price}
          listingId={listing.id}

        />
      ))}
    </Box>
  );
};

export default ListingsContainer;
