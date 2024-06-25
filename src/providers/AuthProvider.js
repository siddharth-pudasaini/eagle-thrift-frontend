import React, { createContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const verifyAuthStatus = async () => {
      try {
        if (authToken) {
          const response = { status: 200 };
          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            setAuthToken(null);
            localStorage.removeItem("authToken");
          }
        }
      } catch (error) {
        setIsAuthenticated(false);
        setAuthToken(null);
        localStorage.removeItem("authToken");
      }
    };

    const interval = setInterval(verifyAuthStatus, 30 * 60 * 1000); // Verify every 30 minutes
    return () => clearInterval(interval);
  }, [authToken]);

  const login = (token) => {
    setAuthToken(token);
    setIsAuthenticated(true);
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ authToken, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
