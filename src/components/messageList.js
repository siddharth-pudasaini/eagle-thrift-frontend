import React, { useState, useEffect, useRef } from "react";
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
  InputAdornment,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Close as CloseIcon,
  Send as SendIcon,
  AttachFile as AttachFileIcon,
} from "@mui/icons-material";


const messages = [
  {
    id: 1,
    heading: "Heading 1",
    subheading: "Subheading 1",
    avatar: "A",
    content: "Content for message 1",
  },
  {
    id: 2,
    heading: "Heading 2",
    subheading: "Subheading 2",
    avatar: "B",
    content: "Content for message 2",
  },
  {
    id: 3,
    heading: "Heading 3",
    subheading: "Subheading 3",
    avatar: "C",
    content: "Content for message 3",
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MessageList = () => {
  const [open, setOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedOpenState = sessionStorage.getItem("dialogOpen");
    const savedMessage = sessionStorage.getItem("selectedMessage");
    const savedChatMessages = sessionStorage.getItem("chatMessages");

    if (savedOpenState === "true" && savedMessage) {
      setOpen(true);
      setSelectedMessage(JSON.parse(savedMessage));
      setChatMessages(JSON.parse(savedChatMessages) || []);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("dialogOpen", open);
    sessionStorage.setItem("selectedMessage", JSON.stringify(selectedMessage));
    sessionStorage.setItem("chatMessages", JSON.stringify(chatMessages));
    scrollToBottom();
  }, [open, selectedMessage, chatMessages]);

  const handleItemClick = (message) => {
    setSelectedMessage(message);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMessage(null);
    setChatMessages([]);
  };

  const handleDelete = (id) => {
    // Handle the delete event
    console.log(`Delete message with id: ${id}`);
    // Example: you can filter out the deleted message from the list
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { type: "text", content: chatInput }]);
      setChatInput("");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setChatMessages([
          ...chatMessages,
          { type: "file", content: e.target.result, name: file.name },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
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
                <DeleteIcon sx={{color:"#a81d1d"}} />
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
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
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
            {chatMessages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  marginBottom: 1,
                  display: "flex",
                }}
              >
                {msg.type === "text" ? (
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
                    {msg.content}
                  </Typography>
                ) : (
                  <Card sx={{ maxWidth: 150 }}>
                    <CardMedia
                      component="img"
                      height="100"
                      image={msg.content}
                      alt={msg.name}
                      sx={{ objectFit: "contain" }}
                    />
                  </Card>
                )}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton component="label">
                      <AttachFileIcon />
                      <input type="file" hidden onChange={handleFileChange} />
                    </IconButton>
                  </InputAdornment>
                ),
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
  );
};

export default MessageList;
