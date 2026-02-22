import React, { useState, useRef } from "react";
import AuthLayout from "../components/AuthLayout";
import { useNavigate } from "react-router-dom";

const VerifyPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(false);

    // Move to next input automatically
    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move back on backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = code.join("");

    if (enteredCode === "1234") {
      localStorage.setItem("adminAuth", "true");
      navigate("/");
    } else {
      setError(true);
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
              ref={(el) => (inputsRef.current[index] = el)}
              value={digit}
              maxLength="1"
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-14 h-14 border rounded-md text-center text-xl outline-none 
                ${error ? "border-red-500" : "border-gray-300"}`}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4">
            Invalid code, please try again. 1234 as test code.
          </p>
        )}

        <button
          onClick={handleVerify}
          className="w-full bg-gradient-to-r cursor-pointer from-blue-600 to-pink-500 text-white py-2 rounded-md"
        >
          Verify
        </button>
      </div>
    </AuthLayout>
  );
};

export default VerifyPage;