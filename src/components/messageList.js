import React, { useState, useEffect, useContext } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Divider,
  Box,
  Container,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { MessageContext } from "../providers/MessageProvider";
import { AuthContext } from "../providers/AuthProvider";
import { UIContext } from "../providers/UIprovider";
import { useNavigate } from "react-router-dom";
import AlertDialog from "./alertDialog";

const MessageList = () => {
  const { messages } = useContext(MessageContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { drawerOpen } = useContext(UIContext);

  const navigate = useNavigate();

  const handleAlertClose = () => {
    navigate("/signIn");
  };

  const handleItemClick = (listingId) => {
    navigate(`/messages/${listingId}`);
  };

  const handleDelete = (id) => {
    // Handle the delete event
    console.log(`Delete message with id: ${id}`);
  };

  // Filter messages to only show the most recent message for each conversation
  const latestMessages = Object.values(
    messages.reduce((acc, message) => {
      acc[message.conversation_id] = message;
      return acc;
    }, {})
  );

  return (
    <>
      {isAuthenticated && (
        <List>
          {latestMessages.map((message, index) => (
            <Container
              key={message.id}
              sx={{
                display: "flex",
              }}
            >
              <ListItem
                button
                onClick={() => handleItemClick(message.listing_id)}
              >
                <ListItemAvatar>
                  <Avatar>{message.avatar}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={message.heading}
                  secondary={message.subheading}
                />
              </ListItem>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(message.id)}
              >
                <DeleteIcon sx={{ color: "#a81d1d" }} />
              </IconButton>
            </Container>
          ))}
        </List>
      )}
      {!isAuthenticated && drawerOpen && (
        <AlertDialog
          open
          message="Please login to view messages"
          onClose={handleAlertClose}
          title="Authentication Error"
        />
      )}
    </>
  );
};

export default MessageList;
