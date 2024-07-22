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
import axios from "axios";
import { Alert } from "@mui/material";

export default function SignUp() {
  const [emailError, setEmailError] = useState({ status: false, message: "" });
  const [passwordError, setPasswordError] = useState({
    status: false,
    message: "",
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    status: false,
    message: "",
  });
  const [usernameError, setUsernameError] = useState({
    status: false,
    message: "",
  });

  const [signUpData, setSignUpData] = useState({
    status: null,
    message: null,
  });

  const handleTextChange = (event) => {
    const { name } = event.target;
    if (name === "email") {
      setEmailError({ status: false, message: "" });
    } else if (name === "password") {
      setPasswordError({ status: false, message: "" });
    } else if (name === "confirmPassword") {
      setConfirmPasswordError({ status: false, message: "" });
    } else if (name === "username") {
      setUsernameError({ status: false, message: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get("email");
    let password = data.get("password");
    let confirmPassword = data.get("confirmPassword");
    let username = data.get("username");

    email = email.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();
    username = username.trim();

    if (username.length === 0) {
      setUsernameError({ status: true, message: "Username is required" });
    } else if (email.length === 0) {
      setEmailError({ status: true, message: "Email is required" });
    } else if (password.length === 0) {
      setPasswordError({ status: true, message: "Password is required" });
    } else if (confirmPassword.length === 0) {
      setConfirmPasswordError({
        status: true,
        message: "Confirm Password is required",
      });
    } else if (password.length < 8) {
      setPasswordError({
        status: true,
        message: "Password should be at least 8 characters long",
      });
    } else if (password !== confirmPassword) {
      setConfirmPasswordError({
        status: true,
        message: "Passwords do not match",
      });
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/user/register",
          {
            username: `${username}`,
            email: `${email}`,
            password: `${password}`,
          }
        );
        if (response.status === 200) {
          setSignUpData({
            status: "success",
            message: "User was registered successfully. ",
          });
          event.target.reset();
        }
      } catch (error) {
        setSignUpData({
          status: "error",
          message: error.response.data.detail || "Registration failed",
        });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "primary.main",
            height: "12rem",
            width: "12rem",
          }}
        >
          <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="Logo" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {signUpData.status && (
          <Alert severity={signUpData.status}>
            {signUpData.message}
            {signUpData.status === "success" && (
              <Link
                component={RouterLink}
                to="/signin"
                variant="body2"
                color="secondary.main"
              >
                {" Sign In"}
              </Link>
            )}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            error={usernameError.status}
            helperText={usernameError.message}
            onChange={handleTextChange}
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
            onChange={handleTextChange}
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
            onChange={handleTextChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            error={confirmPasswordError.status}
            helperText={confirmPasswordError.message}
            onChange={handleTextChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link
                component={RouterLink}
                to="/signin"
                variant="body2"
                color="secondary.main"
              >
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
