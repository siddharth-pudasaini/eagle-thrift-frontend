import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import useMediaQuery from "@mui/material/useMediaQuery";

const MediaCard = ({ title, subheader, media, description }) => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  // Custom arrow component for the slider
  const SampleArrow = ({ className, style, onClick, direction }) => {
    return (
      <div
        className={className}
        onClick={onClick}
        style={{
          ...style,
          display: "block", // Ensure arrows are always visible
          background: "#fff", // White background for better visibility
          borderRadius: "50%", // Circular shape
          padding: "10px", // Padding around the arrow icon
          zIndex: 2, // Increase z-index to ensure it's above other content
          position: "absolute", // Ensure absolute positioning within slider
          top: "50%", // Vertically center
          transform: "translateY(-50%)", // Center adjustment for Y-axis
          [direction === "next" ? "right" : "left"]: 10, // Adjust position from sides
          color: "#333", // Arrow color
          width: "30px", // Width of the arrow box
          height: "30px", // Height of the arrow box
          justifyContent: "center", // Center the icon horizontally
          alignItems: "center", // Center the icon vertically
          opacity: 0.75, // Slightly transparent
        }}
      >
        {direction === "next" ? (
          <ArrowForwardIosIcon />
        ) : (
          <ArrowBackIosNewIcon />
        )}
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleArrow direction="next" />,
    prevArrow: <SampleArrow direction="prev" />,
  };

  return (
    <Card
      sx={{
        maxWidth: isSmallScreen ? "40vw" : "20vw",
        margin: "1rem",
        minHeight: "20vw",
      }}
    >
      <CardActionArea href="/item-link" style={{ height: "100%" }}>
        <CardHeader title={title} subheader={subheader} />
        <Slider {...settings} style={{ height: "50%" }}>
          {media.map((item, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={item.image}
                alt={item.alt || title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
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
