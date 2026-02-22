import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.email && form.password) {
      // Save temporary login step
      localStorage.setItem("adminStep", "login-success");

      navigate("/verify");
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-xl shadow-md w-80">
        <h2 className="text-xl font-bold mb-2 text-center">Log In</h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          You will get a 4 digit code to verify next
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>  
          <h2 className="font-bold mb-2">Enter your email</h2>  
          <input
            type="email"
            name="email"
            placeholder="shify@example.com"
            className="w-full border outline-0 p-2 rounded-md"
            onChange={handleChange}
          />
          </div>

          <div> 
          <h2 className="font-bold mb-2">Enter your password</h2>   
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full border p-2 outline-0 rounded-md"
            onChange={handleChange}
          />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-pink-500 text-white py-2 rounded-md"
          >
            Continue
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;