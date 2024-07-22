import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{ minWidth: 200, cursor: "pointer", margin: 1 }}
    >
      <CardMedia
        component="img"
        height="140"
        image={listing.images[0]}
        alt={listing.title}
      />
      <CardContent>
        <Typography variant="h6">{listing.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {new Date(listing.created_at).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
