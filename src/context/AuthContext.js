import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Add loading state to wait for initialization
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user in localStorage on component mount
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);  // Set user if exists in localStorage
    }
    setLoading(false);  // After loading from localStorage, update loading state
  }, []);  // Empty dependency array to run only once after the initial render

  const login = (username, password) => {
    if (username === "admin" && password === "admin") {
      const userData = { username };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));  // Store user data in localStorage
      navigate("/todo");
    } else {
      alert("Invalid credentials!");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");  // Remove user from localStorage
    navigate("/");
  };

  // Prevent rendering routes until loading is complete
  if (loading) {
    return null;  // Return nothing until the loading state is finished
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
