import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import loginImage from "../assets/login-image.jpg";

const LoginPage = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });

  const validateForm = () => {
    const newErrors = { username: "", password: "" };
    if (!credentials.username) {
      newErrors.username = "Username is required";
    }
    if (!credentials.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      login(credentials.username, credentials.password);
    }
  };

  useEffect(() => {
    document.title = "Login - My TaskTide";
}, []);

  return (
    <div className="flex h-screen w-full">
      {/* Left Half - Image */}
      <div className="w-1/2 h-full">
        <img
          src={loginImage}
          alt="Login"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Half - Form */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full p-2 border rounded mb-2"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded mb-2"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <button className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition-colors duration-300">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
