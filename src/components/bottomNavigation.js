import { useState, useRef } from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/HomeSharp";
import SearchIcon from "@mui/icons-material/SearchSharp";
import AddCircleIcon from "@mui/icons-material/AddCircleSharp";

import Paper from "@mui/material/Paper";

import MessagesWithBadge from "./messages";

export default function FixedBottomNavigation() {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  return (
    <Paper
      ref={ref}
      elevation={20}
      className="bottomNav"
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          padding: 5,
          "& .MuiBottomNavigationAction-root": {
            fontSize: "1rem", // Change the font size here
            fontWeight: "bold",
            color: "black",
          },
          "& .Mui-selected, .Mui-selected > svg": {
            color: "primary",
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon sx={{ fontSize: "1.5rem" }} />}
        />
        <BottomNavigationAction
          label="Add Listing"
          icon={<AddCircleIcon sx={{ fontSize: "1.5rem" }} />}
        />
        <BottomNavigationAction
          label="Search"
          icon={<SearchIcon sx={{ fontSize: "1.5rem" }} />}
        />
      </BottomNavigation>
    </Paper>
  );
}
