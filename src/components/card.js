import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const MediaCard = ({ title, subheader, image, description }) => {
  return (
    <Card style={{ maxWidth: "30vw", margin: "1rem" }}>
      <CardHeader title={title} subheader={subheader} />
      <CardMedia
        component="img"
        height="50%"
        image={image}
        alt={title}
        style={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MediaCard;
