import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      
      {/* LEFT PANEL */}
      <div className="w-1/2 bg-gradient-to-b from-blue-600 to-pink-500 flex flex-col items-center justify-center text-white">
        <div className="bg-white rounded-xl p-6 mb-6">
          <span className="text-4xl font-bold text-purple-600">TU</span>
        </div>
        <h1 className="text-3xl font-bold">Utune</h1>
        <p className="text-sm opacity-80">Powered by</p>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;