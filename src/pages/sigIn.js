import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useState } from "react";

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() {
  const [emailError, setEmailError] = useState({ status: false, message: "" });
  const [passwordError, setPasswordError] = useState({
    status: false,
    message: "",
  });

  const handleTextChange = (event) => {
    if (event.target.name == "email") {
      setEmailError({ status: false, message: "" });
    } else if (event.target.name == "password") {
      setPasswordError({ status: false, message: "" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    let email = data.get("email");
    let password = data.get("password");

    email = email.trim();
    password = password.trim();
    console.log({
      email: email,
      password: password,
    });

    if (email.length == 0) {
      setEmailError({ status: true, message: "Email is required" });
    }
    if (password.length == 0) {
      setPasswordError({ status: true, message: "Password is required" });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" color="error.main">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" color="secondary.main">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
