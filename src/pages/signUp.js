import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";

export default function SignUp() {
  const [emailError, setEmailError] = useState({ status: false, message: "" });
  const [passwordError, setPasswordError] = useState({
    status: false, message: ""
  });
  const [firstNameError, setFirstNameError] = useState({ status: false, message: "" });
  const [lastNameError, setLastNameError] = useState({ status: false, message: "" });
  const [dobError, setDobError] = useState({ status: false, message: "" });
  const [untIdError, setUntIdError] = useState({ status: false, message: "" });

  const handleTextChange = (event) => {
    const { name } = event.target;
    if (name === "email") {
      setEmailError({ status: false, message: "" });
    } else if (name === "password") {
      setPasswordError({ status: false, message: "" });
    } else if (name === "firstName") {
      setFirstNameError({ status: false, message: "" });
    } else if (name === "lastName") {
      setLastNameError({ status: false, message: "" });
    } else if (name === "dob") {
      setDobError({ status: false, message: "" });
    } else if (name === "untId") {
      setUntIdError({ status: false, message: "" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get("email");
    let password = data.get("password");
    let firstName = data.get("firstName");
    let lastName = data.get("lastName");
    let dob = data.get("dob");
    let untId = data.get("untId");

    email = email.trim();
    password = password.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    dob = dob.trim();
    untId = untId.trim();

    if (firstName.length === 0) {
      setFirstNameError({ status: true, message: "First name is required" });
    }
    if (lastName.length === 0) {
      setLastNameError({ status: true, message: "Last name is required" });
    }
    if (dob.length === 0) {
      setDobError({ status: true, message: "Date of birth is required" });
    }
    if (untId.length === 0) {
      setUntIdError({ status: true, message: "UNT ID is required" });
    }
    if (email.length === 0) {
      setEmailError({ status: true, message: "Email is required" });
    }
    if (password.length === 0) {
      setPasswordError({ status: true, message: "Password is required" });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          marginBottom:10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main", height: "12rem", width: "12rem" }}>
          <img src="./logo192.png" alt="Logo of Eagle over Cart" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            autoFocus
            error={firstNameError.status}
            helperText={firstNameError.message}
            onClick={handleTextChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            error={lastNameError.status}
            helperText={lastNameError.message}
            onClick={handleTextChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="dob"
            label="Date of Birth"
            name="dob"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            error={dobError.status}
            helperText={dobError.message}
            onClick={handleTextChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="untId"
            label="UNT ID"
            name="untId"
            error={untIdError.status}
            helperText={untIdError.message}
            onClick={handleTextChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={emailError.status}
            helperText={emailError.message}
            onClick={handleTextChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={passwordError.status}
            helperText={passwordError.message}
            onClick={handleTextChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/signin" variant="body2" color="secondary.main">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
