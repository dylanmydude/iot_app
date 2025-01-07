// src/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component }) => {
  const isAuthenticated = () => {
    // Replace with your actual authentication logic
    return !!localStorage.getItem("authToken");
  };

  return isAuthenticated() ? component : <Navigate to="/login" />;
};

export default ProtectedRoute;
