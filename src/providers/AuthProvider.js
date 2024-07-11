import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Create Auth Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate=useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    } 
  }, [authToken]);

 
  const login = async (email, password) => {
    const response = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: `${email}`, password: `${password}` }),
    });
    const responseStatus = await response.status;
    const result = await response.json();
    if (responseStatus === 200) {
      localStorage.setItem("authToken", result.token);
      setAuthToken(result.token);
      setIsAuthenticated(true);
      navigate('/')

    } else if (responseStatus === 422) {
      alert("Please enter valid email and password");
    } else if (responseStatus == 401) {
      alert("Invaid username or password");
    } else if (responseStatus === 404) {
      alert("User not found");
    }
  };

  const logout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ authToken, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
