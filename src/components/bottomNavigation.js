import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/HomeSharp";
import SearchIcon from "@mui/icons-material/SearchSharp";
import AddCircleIcon from "@mui/icons-material/AddCircleSharp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Paper from "@mui/material/Paper";

export default function FixedBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setValue(0);
        break;
      case "/add-listing":
        setValue(1);
        break;
      case "/search":
        setValue(2);
        break;
      case "/account-info":
        setValue(3);
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
      case 3:
        navigate("/account-info");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <Paper
      elevation={20}
      className="bottomNav"
      sx={{
        position: "sticky",
        bottom: 0,
        width: "100%",
        zIndex: 10,
        marginTop: "1%",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigationChange}
        sx={{
          padding: 5,
          "& .MuiBottomNavigationAction-root": {
            fontSize: "1rem",
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
        <BottomNavigationAction
          label="Account"
          icon={<AccountCircleIcon sx={{ fontSize: "1.5rem" }} />}
        />
      </BottomNavigation>
    </Paper>
  );
}
