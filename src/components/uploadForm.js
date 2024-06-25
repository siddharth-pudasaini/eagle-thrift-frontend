import React, { useState } from "react";
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
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import AlertDialog from "./alertDialog";

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
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const lastFile = newFiles[newFiles.length - 1];
    const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB in bytes

    if (lastFile.size > maxSizeInBytes) {
      setAlertOpen(true);
      setAlertMessage("File size exeeds 1MB limit");
    } else {
      setFiles((prevFiles) => [...prevFiles, lastFile]);
    }

    event.target.value = null; // Reset the input value to allow the same file to be uploaded again
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleClick = (file) => {
    setSelectedFile(file);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
  };

  const handleClearAll = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setFiles([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ title, description, price, files });
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    setAlertMessage("");
  };

  return (
    <Box sx={{ p: 3}}>
      <h3 gutterBottom>Create Listing</h3>
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
            inputProps={{ maxLength: 5000 }}
            helperText={`${description.length}/5000 characters`}
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
          accept="image/*,video/*"
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
              onClick={() => handleClick(file)}
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
      <Modal open={open} onClose={handleClose}>
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
            onClick={handleClose}
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
      <AlertDialog
        open={alertOpen}
        message={alertMessage}
        title="File Size Error"
        onClose={handleAlertClose}
      />
    </Box>
  );
}
