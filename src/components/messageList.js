import React, { useState, useEffect, useRef,useContext } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Divider,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Slide,
  Box,
  
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Close as CloseIcon,
  Send as SendIcon,
  AttachFile as AttachFileIcon,
} from "@mui/icons-material";

import { MessageContext } from "../providers/MessageProvider";
import { AuthContext } from "../providers/AuthProvider";
import { UIContext } from "../providers/UIprovider";
import AlertDialog from "./alertDialog";

import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MessageList = () => {
  const [open, setOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef(null);
  const {sendMessage,messages}=useContext(MessageContext)
  const {isAuthenticated}=useContext(AuthContext)
  const {drawerOpen}=useContext(UIContext)

  
  useEffect(() => {
    const savedOpenState = sessionStorage.getItem("dialogOpen");
    const savedMessage = sessionStorage.getItem("selectedMessage");
    const savedChatMessages = sessionStorage.getItem("chatMessages");

    if (savedOpenState === "true" && savedMessage) {
      setOpen(true);
      setSelectedMessage(JSON.parse(savedMessage));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("dialogOpen", open);
    sessionStorage.setItem("selectedMessage", JSON.stringify(selectedMessage));
    scrollToBottom();
  }, [open, selectedMessage]);

  const navigate = useNavigate();

  const handleAlertClose = () => {
    navigate("/signIn");
  };

  const handleItemClick = (message) => {
    setSelectedMessage(message);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMessage(null);
  };

  const handleDelete = (id) => {
    // Handle the delete event
    console.log(`Delete message with id: ${id}`);
    // Example: you can filter out the deleted message from the list
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      sendMessage(chatInput,1)
      setChatInput("");
    }
  };


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {isAuthenticated && (
        <>
          <List>
            {messages.map((message, index) => (
              <React.Fragment key={message.id}>
                <ListItem button onClick={() => handleItemClick(message)}>
                  <ListItemAvatar>
                    <Avatar>{message.avatar}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={message.heading}
                    secondary={message.subheading}
                  />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(message.id)}
                  >
                    <DeleteIcon sx={{ color: "#a81d1d" }} />
                  </IconButton>
                </ListItem>
                {index < messages.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>

          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  {selectedMessage?.heading}
                </Typography>
              </Toolbar>
            </AppBar>
            <Box
              sx={{
                padding: 1,
                display: "flex",
                flexDirection: "column",
                height: "90%",
              }}
            >
              <Box sx={{ flex: 1, overflowY: "auto", marginBottom: 2 }}>
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    sx={{
                      marginBottom: 1,
                      display: "flex",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        backgroundColor: "#f0f0f0",
                        padding: 1,
                        borderRadius: 1,
                        maxWidth: "40%",
                        wordWrap: "break-word",
                      }}
                    >
                      {msg}
                    </Typography>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  sx={{ marginRight: 1 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendMessage}
                >
                  <SendIcon />
                </Button>
              </Box>
            </Box>
          </Dialog>
        </>
      )}
      {!isAuthenticated &&drawerOpen && (
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
