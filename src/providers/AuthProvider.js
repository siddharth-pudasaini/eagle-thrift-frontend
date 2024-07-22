import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Create Auth Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("userEmail");
    const username = localStorage.getItem("username");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      setUserEmail(userEmail);
      setUserId(userId);
      setUsername(username);
    }
  }, [authToken]);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: `${email}`, password: `${password}` }),
      });

      const responseStatus = response.status; // Use response.status directly without await
      const result = await response.json();

      if (responseStatus === 200) {
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("userId", result.id);
        localStorage.setItem("userEmail", result.email);
        localStorage.setItem("username", result.username);
        setAuthToken(result.token);
        setIsAuthenticated(true);
        setUserEmail(result.email);
        setUserId(result.id);
        setUsername(result.username);
        navigate("/");
      } else if (responseStatus === 422) {
        alert("Please enter valid email and password");
      } else if (responseStatus === 401) {
        alert("Invalid username or password");
      } else if (responseStatus === 404) {
        alert("User not found");
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      alert(
        "Failed to connect to the server. Please check your internet connection or try again later."
      );
      console.error("Connection error:", error); // Log the error for debugging
    }
  };

  const logout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    setUserEmail("");
    setUserId("");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ authToken, isAuthenticated, login, logout, userId, userEmail,username }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
