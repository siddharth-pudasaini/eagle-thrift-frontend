import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Stack,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { UIContext } from "../providers/UIprovider";

const categories = [
  "All",
  "Category 1",
  "Category 2",
  "Category 3",
  "Category 4",
];

export default function Filters() {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [sortOrder, setSortOrder] = useState("newest");

  const { drawerOpen } = useContext(UIContext);

  useEffect(() => {
    const savedOpenState = sessionStorage.getItem("drawerOpen");
    if (savedOpenState === "true") {
      setOpen(true);
    }
  }, []);

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleDelete = (categoryToDelete) => () => {
    setSelectedCategories((categories) =>
      categories.filter((category) => category !== categoryToDelete)
    );
  };

  return (
    <Box sx={{ margin: "1.5vh", minWidth: "50vw" }}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Categories</InputLabel>
        <Select
          multiple
          value={selectedCategories}
          onChange={handleCategoryChange}
          input={<OutlinedInput label="Categories" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={selectedCategories.indexOf(category) > -1} />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortOrder} onChange={handleSortChange} label="Sort By">
          <MenuItem value="newest">Newest to Oldest</MenuItem>
          <MenuItem value="oldest">Oldest to Newest</MenuItem>
        </Select>
      </FormControl>

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap",p:'1%'}}>
        {selectedCategories.map((category) => (
          <Chip
            key={category}
            label={category}
            onDelete={handleDelete(category)}
            color="primary"
            sx={{
              marginBottom:'1vh',
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
