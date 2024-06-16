import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/HomeSharp";
import SearchIcon from "@mui/icons-material/SearchSharp";
import AddCircleIcon from "@mui/icons-material/AddCircleSharp";

import Paper from "@mui/material/Paper";

export default function FixedBottomNavigation() {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/add-listing":
        setValue(1);
        break;
      case "/search":
        setValue(2);
        break;
      case "/":
        setValue(0);
        break;
      default:
        setValue(0);
    }
  }, [location.pathname]);

  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/add-listing");
        break;
      case 2:
        navigate("/search");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <Paper
      elevation={20}
      className="bottomNav"
      å
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 1000, // Ensure it stays on top
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigationChange}
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
