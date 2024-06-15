import React from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Box from "@mui/material/Box";



function MessagesWithBadge() {
  const unreadMessages = 5; // Example number of unread messages

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Badge badgeContent={unreadMessages} color="secondary">
        <MailIcon />
      </Badge>
    </Box>
  );
}

export default MessagesWithBadge;
