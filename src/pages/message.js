import React, { useState, useEffect, useRef, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  TextField,
  Button,
  Slide,
  Dialog,
} from "@mui/material";
import {
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { MessageContext } from "../providers/MessageProvider";
import { AuthContext } from "../providers/AuthProvider";
import AlertDialog from "../components/alertDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MessagePage = () => {
  const [chatInput, setChatInput] = useState("");
  const [listingMessages, setListingMessages] = useState([]);
  const { sendMessage, messages } = useContext(MessageContext);
  const { isAuthenticated, authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { listing_id } = useParams();
  const messagesEndRef = useRef(null);

  useEffect(() => {
  
    // Fetch messages for the specific listing from the database
    const fetchMessages = async () => {
      const response = await fetch(`/api/messages/${listing_id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      setListingMessages(data);
    };

    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated, listing_id, authToken, navigate]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      sendMessage(chatInput, listing_id);
      setChatInput("");
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleAlertClose=()=>{
    navigate('/signIn')
  }

  useEffect(() => {
    // Filter and display messages relevant to the listing
    const relevantMessages = messages.filter(
      (msg) => msg.listing_id === parseInt(listing_id)
    );
    setListingMessages(relevantMessages);
  }, [messages, listing_id]);

  useEffect(() => {
    scrollToBottom();
  }, [listingMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (isAuthenticated) {
    return (
      <Dialog fullScreen open={true} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleBackClick}
              aria-label="back"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Messages
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleBackClick}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
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
            {listingMessages.map((msg, index) => (
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
                  {msg.heading}: {msg.subheading}
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
                  handleSendMessage(e);
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
    );
  } else {
    return (
      <AlertDialog
        open
        message="Please login to view messages"
        onClose={handleAlertClose}
        title="Authentication Error"
      />
    );
  }
};

export default MessagePage;
