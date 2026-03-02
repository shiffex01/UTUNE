import React from "react";
import adaptive_icon from "../assets/adaptive_icon.png"

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      
      {/* LEFT PANEL */}
      <div className="w-1/2 bg-gradient-to-r from-blue-600 to-pink-500 flex flex-col items-center justify-center text-white">
        <div className="bg-white rounded-xl p-4 mb-6">
          <img src={adaptive_icon} className="h-16 w-14" alt="UTUNE LOGO" />
        </div>
        <h1 className="text-3xl font-bold">Utune</h1>
        <p className="text-sm opacity-80">Powered by</p>
        <p className="text-sm opacity-80 font-bold">CHIRAK</p>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;