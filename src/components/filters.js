import React, { useState, useEffect } from "react";
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
import axios from "axios";

const Filters = ({ selectedCategoryIds, sortOrder, onFilterChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories"
        );
        setCategories([{ id: 0, name: "All" }, ...response.data]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;

    let updatedCategoryIds;
    if (value.includes(0)) {
      updatedCategoryIds = [0];
    } else {
      updatedCategoryIds =
        typeof value === "string" ? value.split(",").map(Number) : value;
      updatedCategoryIds = updatedCategoryIds.filter((id) => id !== 0);
    }

    onFilterChange({ selectedCategoryIds: updatedCategoryIds, sortOrder });
  };

  const handleSortChange = (event) => {
    onFilterChange({ selectedCategoryIds, sortOrder: event.target.value });
  };

  const handleDelete = (categoryIdToDelete) => () => {
    const updatedCategories = selectedCategoryIds.filter(
      (id) => id !== categoryIdToDelete
    );
    onFilterChange({ selectedCategoryIds: updatedCategories, sortOrder });
  };

  const getCategoryNameById = (id) => {
    const category = categories.find((category) => category.id === id);
    return category ? category.name : "";
  };

  return (
    <Box sx={{ margin: "1.5vh", minWidth: "50vw" }}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Categories</InputLabel>
        <Select
          multiple
          value={selectedCategoryIds}
          onChange={handleCategoryChange}
          input={<OutlinedInput label="Categories" />}
          renderValue={(selected) =>
            selected.map((id) => getCategoryNameById(id)).join(", ")
          }
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              <Checkbox
                checked={selectedCategoryIds.indexOf(category.id) > -1}
              />
              <ListItemText primary={category.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortOrder} onChange={handleSortChange} label="Sort By">
          <MenuItem value="newest">Newest to Oldest</MenuItem>
          <MenuItem value="oldest">Oldest to Newest</MenuItem>
          <MenuItem value="price_high_to_low">Price: High to Low</MenuItem>
          <MenuItem value="price_low_to_high">Price: Low to High</MenuItem>
        </Select>
      </FormControl>

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", p: "1%" }}>
        {selectedCategoryIds.map((id) => (
          <Chip
            key={id}
            label={getCategoryNameById(id)}
            onDelete={id !== 0 ? handleDelete(id) : undefined}
            color="primary"
            sx={{
              marginBottom: "1vh",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Filters;
