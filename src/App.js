import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ToDoPage from "./pages/ToDoPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/todo" element={<ProtectedRoute><ToDoPage /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
