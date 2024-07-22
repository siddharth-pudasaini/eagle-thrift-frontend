import React from "react";
import {
  Card,
  CardHeader,
  Typography,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import MessageIcon from "@mui/icons-material/Message";

export default function MediaCard({
  price,
  media,
  title,
  dateListed,
  description,
  listingId,
}) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();

  const ItemMenu = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "90%",
          padding: "1%",
        }}
      >
        <IconButton onClick={() => navigate(`/messages/${listingId}`)}>
          <MessageIcon color="primary" />
        </IconButton>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate(`/listing/${listingId}`)}
        >
          View Listing
        </Button>
      </Box>
    );
  };

  return (
    <Card
      variant="elevation"
      elevation={5}
      sx={{
        width: isMobile ? "90%" : "30%",
        minHeight: isMobile ? "45vw" : "10vw",
        margin: "1%",
      }}
    >
      <CardHeader title={title} subheader={dateListed} />
      <Container
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: isMobile ? "45vw" : "25vw", // Fixed height
        }}
      >
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          useKeyboardArrows={true}
        >
          {media.map((item, index) => (
            <div key={index}>
              <img
                src={item.image}
                alt={`Listing image ${index}`}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          ))}
        </Carousel>
      </Container>
      <Typography
        sx={{
          margin: "1vh",
          color: "primary.main",
          fontWeight: "bold",
        }}
      >
        Price: {price}
      </Typography>
      {ItemMenu()}
      <Typography
        variant="body1"
        color="textSecondary"
        component="p"
        sx={{ margin: "3%" }}
      >
        {description.length > 100
          ? `${description.substring(0, 100)}...`
          : description}
      </Typography>
    </Card>
  );
}
