import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Grid,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import { AuthContext } from "../providers/AuthProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function UploadForm() {
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        setAlertOpen(true);
        setAlertMessage("Error fetching categories.");
        setAlertType("error");
      }
    };

    fetchCategories();
  }, [authToken]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes
    const allowedExtensions = ["png", "jpg", "jpeg"];

    const validFiles = newFiles.filter((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        setAlertOpen(true);
        setAlertMessage("Only PNG, JPG, and JPEG files are allowed.");
        setAlertType("error");
        return false;
      } else if (file.size > maxSizeInBytes) {
        setAlertOpen(true);
        setAlertMessage("File size exceeds 5MB limit.");
        setAlertType("error");
        return false;
      }
      return true;
    });

    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    event.target.value = null; // Reset the input value to allow the same file to be uploaded again
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleClickFile = (file) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handleClearAll = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setFiles([]);
    setSelectedCategoryId("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setAlertOpen(true);
      setAlertMessage("Title is required.");
      setAlertType("error");
      return;
    }

    if (!description.trim()) {
      setAlertOpen(true);
      setAlertMessage("Description is required.");
      setAlertType("error");
      return;
    }

    if (!price.trim() || isNaN(price) || parseFloat(price) <= 0) {
      setAlertOpen(true);
      setAlertMessage("Valid price is required.");
      setAlertType("error");
      return;
    }

    if (files.length === 0) {
      setAlertOpen(true);
      setAlertMessage("Please upload at least one file.");
      setAlertType("error");
      return;
    }

    if (!selectedCategoryId) {
      setAlertOpen(true);
      setAlertMessage("Please select a category.");
      setAlertType("error");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", selectedCategoryId);
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/listing",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setAlertOpen(true);
      setAlertMessage("Listing created successfully.");
      setAlertType("success");
      handleClearAll();
    } catch (error) {
      setAlertOpen(true);
      setAlertMessage(
        `Error creating listing: ${error.response.data.detail}. Please sign out and sign in again`
      );
      setAlertType("error");
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    setAlertMessage("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <h3>Create Listing</h3>
      {alertOpen && (
        <Alert
          severity={alertType}
          onClose={handleAlertClose}
          sx={{ marginBottom: "3vh" }}
        >
          {alertMessage}
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            inputProps={{ maxLength: 2000 }}
            helperText={`${description.length}/2000 characters`}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            variant="outlined"
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        component="label"
        startIcon={<PhotoCamera />}
        sx={{ mt: 2 }}
      >
        Upload Images or Videos
        <input
          type="file"
          hidden
          accept="image/png, image/jpg, image/jpeg"
          multiple
          onChange={handleFileChange}
        />
      </Button>
      <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>
        {files.map((file, index) => (
          <Card key={index} sx={{ maxWidth: 200, position: "relative" }}>
            <CardMedia
              component={file.type.startsWith("image") ? "img" : "video"}
              height="140"
              src={URL.createObjectURL(file)}
              title={file.name}
              controls={file.type.startsWith("video")}
              onClick={() => handleClickFile(file)}
            />
            <IconButton
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                color: "white",
                bgcolor: "rgba(0, 0, 0, 0.5)",
              }}
              onClick={() => handleRemoveFile(index)}
            >
              <DeleteIcon />
            </IconButton>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {file.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClearAll}
          sx={{ ml: 2 }}
        >
          Clear All
        </Button>
      </Box>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{ ...style, width: "auto", maxWidth: "90%", maxHeight: "90%" }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
              color: "white",
              bgcolor: "rgba(0, 0, 0, 0.5)",
            }}
            onClick={closeModal}
          >
            <CloseIcon />
          </IconButton>
          {selectedFile && (
            <Box sx={{ textAlign: "center" }}>
              <CardMedia
                component={
                  selectedFile.type.startsWith("image") ? "img" : "video"
                }
                src={URL.createObjectURL(selectedFile)}
                title={selectedFile.name}
                controls={selectedFile.type.startsWith("video")}
                sx={{ maxHeight: "80vh", maxWidth: "100%" }}
              />
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
