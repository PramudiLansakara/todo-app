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
        My TaskTide
      </h1>

      {/* Logout Button */}
      <button 
        onClick={logout} 
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-md"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
