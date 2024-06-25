import React, { useState, useRef } from "react";
import {
  Container,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Box,
} from "@mui/material";

export default function AccountInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Name of the User",
    email: "name@domain.com",
    bio: "A description of this user.",
    avatar: "/path/to/profile.jpg",
  });
  const [updatedInfo, setUpdatedInfo] = useState(userInfo);
  const fileInputRef = useRef(null);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setUpdatedInfo(userInfo);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo({ ...updatedInfo, [name]: value });
  };

  const handleUpdateInfo = () => {
    setUserInfo(updatedInfo);
    setIsEditing(false);
  };

  const isInfoChanged = () => {
    return JSON.stringify(userInfo) !== JSON.stringify(updatedInfo);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedInfo({ ...updatedInfo, avatar: reader.result });
        console.log("New image uploaded:", file);
        // Simulate a backend call
        console.log("Image sent to the backend");
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Container component="main" sx={{ mt: "3vh", mb: "3vh" }}>
      <Typography
        variant="h4"
        component="div"
        sx={{ textAlign: "center", mb: 4 }}
      >
        Account Information
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Avatar
          sx={{ width: 100, height: 100, objectFit: "cover" }}
          src={updatedInfo.avatar}
        />
        <Button
          variant="text"
          color="primary"
          onClick={triggerFileInput}
          sx={{ mt: 1, textTransform: "none", fontSize: "1.25rem" }}
        >
          Edit profile image
        </Button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </Box>
      <List component="nav" sx={{ mt: 2 }}>
        <ListItem>
          <ListItemText
            primary="Name"
            secondary={
              isEditing ? (
                <TextField
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={updatedInfo.name}
                  onChange={handleChange}
                />
              ) : (
                userInfo.name
              )
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Email"
            secondary={
              isEditing ? (
                <TextField
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={updatedInfo.email}
                  onChange={handleChange}
                />
              ) : (
                userInfo.email
              )
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Bio"
            secondary={
              isEditing ? (
                <TextField
                  variant="outlined"
                  fullWidth
                  name="bio"
                  value={updatedInfo.bio}
                  onChange={handleChange}
                />
              ) : (
                userInfo.bio
              )
            }
          />
        </ListItem>
        <Divider />
      </List>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        {isEditing ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateInfo}
            sx={{ mr: 2 }}
            disabled={!isInfoChanged()}
          >
            Update Info
          </Button>
        ) : null}
        <Button
          variant="outlined"
          color={isEditing ? "error" : "primary"}
          onClick={handleEditToggle}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </Box>
      <Typography variant="h6" component="div" sx={{ mt: 4, mb: 2 }}>
        My Listings
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "scroll",
          padding: 2, // General style for the whole scrollbar area
          "&::-webkit-scrollbar": {
            width: "10px", // Width of the vertical scrollbar
            height: "8px", // Height of the horizontal scrollbar
          },

          // Style for the track of the scrollbar
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1", // Light grey background for the track
            borderRadius: "10px", // Rounded corners for the track
          },

          // Style for the thumb of the scrollbar (draggable part)
          "&::-webkit-scrollbar-thumb": {
            background: "#888", // Darker shade for the thumb for contrast
            borderRadius: "10px", // Rounded corners for the thumb
            border: "2px solid transparent", // Optional: Adding border can make thumb stand out
            backgroundClip: "content-box", // Ensures the border does not take space inside the thumb
          },

          // Optional: Style for the thumb on hover or active state
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555", // Slightly darker on hover for visual feedback
          },
        }}
      >
        {Array(5)
          .fill("/path/to/listing/image.jpg")
          .map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Listing ${index}`}
              style={{
                width: 100,
                height: 100,
                marginRight: 8,
                objectFit: "cover",
              }}
            />
          ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          mt: 4,
        }}
      >
        <Button
          variant="outlined"
          color="error"
          sx={{ textTransform: "none", fontSize: "1.0rem", mb: 2 }}
        >
          Delete Account
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "1.25rem" }}
        >
          Log Out
        </Button>
      </Box>
    </Container>
  );
}
