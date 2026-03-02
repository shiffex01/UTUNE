import React, { useState, useEffect } from "react";
import AuthLayout from "../components/AuthLayout";
import { useNavigate } from "react-router-dom";
import adaptive_icon from "../assets/adaptive_icon.png"

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isMobile, setIsMobile] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

    // Hide splash after 2 seconds
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);

    


  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email && form.password) {
      localStorage.setItem("adminStep", "login-success");
      navigate("/verify");
    }
  };

  if (showSplash) {
    return (
      <div className="w-full bg-gradient-to-r from-blue-600 to-pink-500 h-screen flex flex-col items-center justify-center text-white">
        <div className="bg-white rounded-xl p-4 mb-6">
          <img src={adaptive_icon} className="h-16 w-14" alt="UTUNE LOGO" />
        </div>
        <h1 className="text-3xl font-bold">Utune</h1>
        <p className="text-sm opacity-80">Powered by</p>
        <p className="text-sm opacity-80 font-bold">CHIRAK</p>
      </div>
    );
  }

  // Login Card
  const loginCard = (
    <div className="bg-white/95 backdrop-blur-md w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl mx-auto animate-slideUp">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center">
        Log In
      </h2>
      <p className="text-gray-500 text-sm sm:text-base text-center mb-6">
        You will get a 4 digit code to verify next
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold mb-2 text-sm sm:text-base">
            Enter your email
          </label>
          <input
            type="email"
            name="email"
            placeholder="shify@example.com"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base transition"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-sm sm:text-base">
            Enter your password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base transition"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:opacity-90 transition text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold"
        >
          Continue
        </button>
      </form>
    </div>
  );

  // Return
  if (isMobile) {
    // Mobile → only show centered card
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        {loginCard}
      </div>
    );
  }

  // Desktop/Web → wrap in AuthLayout
  return <AuthLayout>{loginCard}</AuthLayout>;
};

export default LoginPage;