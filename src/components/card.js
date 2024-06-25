import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import Slider from "react-slick";

const MediaCard = ({ title, subheader, media, description }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Card sx={{ maxWidth: "30vw", margin: "1rem", height: "500px" }}>
      <CardActionArea href="/item-link" style={{ height: "100%" }}>
        <CardHeader title={title} subheader={subheader} />
        <Slider {...settings} style={{ height: "50%" }}>
          {media.map((item, index) => (
            <div key={index}>
              <img
                src={item.image}
                alt={item.alt || title}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          ))}
        </Slider>
        <CardContent>
          <Typography variant="body2" sx={{ overflow: "auto", height: "20%" }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MediaCard;
