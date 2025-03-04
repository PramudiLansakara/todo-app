import React from "react";
import { useAuth } from "../context/AuthContext";


const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white p-4 flex justify-between items-center shadow-md">
      {/* Todo Title */}
      <h1 
        className="text-3xl font-extrabold"
      >
        ToDoEase
      </h1>

      {/* Logout Button */}
      <button 
        onClick={logout} 
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-lg transition-all duration-300"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
