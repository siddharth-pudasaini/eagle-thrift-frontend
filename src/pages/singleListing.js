import React, { useState, useEffect } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import "./CarouselStyles.css"; // Import custom carousel styles
import Navbar from "../components/navbar";
import SimpleBottomNavigation from "../components/bottomNavigation";
import ScrollToTop from "../components/scrollButton";
import ContentArea from "../components/contentArea";

const ListingDetails = () => {
  const { listing_id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/listing/${listing_id}`
        );
        setListing(response.data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [listing_id]);

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!listing) {
    return (
      <Container>
        <Typography
          variant="h4"
          component="div"
          sx={{ textAlign: "center", mt: 4 }}
        >
          Listing not found
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <ContentArea>
        <Container component="main" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ width: "100%", mb: 4 }}>
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop={true}
              useKeyboardArrows={true}
              autoPlay={true}
              dynamicHeight={false}
              style={{ width: "100%", height: "auto" }}
            >
              {listing.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Listing image ${index}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              ))}
            </Carousel>
          </Box>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h4" component="div" sx={{ mb: 2 }}>
              {listing.title}
            </Typography>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              Price: ${listing.price}
            </Typography>
            <Typography variant="body1" component="div" sx={{ mb: 2 }}>
              {listing.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              Listed on: {new Date(listing.created_at).toLocaleDateString()}
            </Typography>
          </Box>
        </Container>
      </ContentArea>
      <ScrollToTop />
      <SimpleBottomNavigation />
    </>
  );
};

export default ListingDetails;
