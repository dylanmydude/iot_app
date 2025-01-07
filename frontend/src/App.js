// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Route */}
        <Route path="/" element={<ProtectedRoute component={<Dashboard />} />} />

        {/* Redirect any unknown routes to /login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
