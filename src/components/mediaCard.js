import React, { useState } from "react";
import {
  Card,
  CardMedia,
  useMediaQuery,
  Button,
  Container,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CardHeader from "@mui/material/CardHeader";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";

export default function MediaCard({ media, title, dateListed, description }) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const totalImages = media.length;
  const [activeImage, setActiveImage] = useState(0);

  const swipeLeft = (e) => {
    e.preventDefault();
    if (activeImage !== 0) {
      setActiveImage((prev) => prev - 1);
    }
  };

  const swipeRight = (e) => {
    e.preventDefault();
    if (activeImage !== totalImages - 1) {
      setActiveImage((prev) => prev + 1);
    }
  };

  const SelectedItem = () => (
    <Box
      sx={{
        width: "100%",
        margin: "1%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {media.map((item, index) =>
        index === activeImage ? (
          <CircleIcon
            key={index}
            color="secondary"
            fontSize="small"
            sx={{ margin: "5%" }}
          />
        ) : (
          <CircleOutlinedIcon
            fontSize="small"
            key={index}
            color="secondary"
            sx={{ margin: "5%" }}
          />
        )
      )}
    </Box>
  );

  const ItemMenu = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: isMobile ? "70%" : "50%",
          padding: "1%",
        }}
      >
        <IconButton>
          <FavoriteIcon color="secondary" />
        </IconButton>
        <IconButton>
          <MessageIcon color="primary" />
        </IconButton>
        <Button variant="outlined" color="primary">
          View Listing
        </Button>
      </Box>
    );
  };

  const ImagesWithButtons = () => (
    <Container
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Button onClick={swipeLeft}>
        <ArrowBackIcon  />
      </Button>

      <CardMedia
        key={activeImage}
        component="img"
        image={media[activeImage].image}
        alt={title}
        sx={{
          width: "80%",
          height: "100%",
          objectFit: "fill",
    
        }}
      />

      <Button onClick={swipeRight}>
        <ArrowForwardIcon  />
      </Button>
    </Container>
  );

  return (
    <Card
      variant="elevation"
      elevation={5}
      sx={{
        width: isMobile ? "90%" : "30%",
        minHeight: isMobile ? "45vw" : "25vw",
        margin: "1%",
      }}
    >
      <CardHeader title={title} subheader={dateListed} />
      {ImagesWithButtons()}
      {SelectedItem()}
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
