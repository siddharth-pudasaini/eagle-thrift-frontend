import React, { useState, useEffect, useRef, useContext } from "react";
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

import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import ListingCard from "./userListingCard"; // Import the ListingCard component
import axios from "axios";

export default function AccountInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const { logout, username, userEmail, userId } = useContext(AuthContext); // Ensure userId is provided by AuthContext
  const [userInfo, setUserInfo] = useState({
    name: username,
    email: userEmail,
    avatar: `localhost:8000/uploads/profiles/${userId}/user_image`,
  });
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  const [updatedInfo, setUpdatedInfo] = useState(userInfo);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchListings = async () => {
      if (!userId) {
        console.error("User ID is not defined.");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8000/api/listings/user/${parseInt(userId)}`
        );
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [userId]);

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
                  disabled // Disable email text field in editing mode
                />
              ) : (
                userInfo.email
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
          padding: 2,
          "&::-webkit-scrollbar": {
            width: "10px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "10px",
            border: "2px solid transparent",
            backgroundClip: "content-box",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
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
          onClick={logout}
        >
          Log Out
        </Button>
      </Box>
    </Container>
  );
}
