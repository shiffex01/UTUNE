import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { useNavigate } from "react-router-dom";

const VerifyPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  const handleVerify = () => {
    // 🚀 MOCK VERIFY
    if (code.join("").length === 4) {
      navigate("/");
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white p-8 rounded-xl shadow-md w-96 text-center">
        <h2 className="text-xl font-bold mb-6">Enter Code</h2>

        <div className="flex justify-between mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              value={digit}
              maxLength="1"
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-14 h-14 border rounded-md text-center text-xl"
            />
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Didn't receive code?{" "}
          <span className="text-blue-600 cursor-pointer">
            Request Again
          </span>
        </p>

        <button
          onClick={handleVerify}
          className="w-full bg-gradient-to-r from-blue-600 to-pink-500 text-white py-2 rounded-md"
        >
          Verify
        </button>
      </div>
    </AuthLayout>
  );
};

export default VerifyPage;