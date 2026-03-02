import React, { useState, useRef, useEffect } from "react";
import AuthLayout from "../components/AuthLayout";
import { useNavigate } from "react-router-dom";

const VerifyPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const inputsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Verify card
  const verifyCard = (
    <div className="bg-white/95 backdrop-blur-md w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl mx-auto animate-slideUp text-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">Enter Code</h2>

      <div className="flex justify-between mb-4">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            value={digit}
            maxLength="1"
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`w-14 h-14 sm:w-16 sm:h-16 border rounded-md text-center text-xl sm:text-2xl outline-none 
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
        className="w-full bg-gradient-to-r from-blue-600 to-pink-500 text-white py-2 sm:py-3 rounded-lg font-semibold hover:opacity-90 transition"
      >
        Verify
      </button>
    </div>
  );

  // Return
  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        {verifyCard}
      </div>
    );
  }

  return <AuthLayout>{verifyCard}</AuthLayout>;
};

export default VerifyPage;