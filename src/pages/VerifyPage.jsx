import React, { useState, useRef, useEffect } from "react";
import AuthLayout from "../components/AuthLayout";
import { useNavigate } from "react-router-dom";
import { verifyAdminOTP } from "../services/api";

const VerifyPage = () => {
  const navigate = useNavigate();
  const OTP_LENGTH = 6;
  const [code, setCode] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
    setError("");

    // Move to next input automatically
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const enteredCode = code.join("");
    if (enteredCode.length < OTP_LENGTH) {
      setError("Please enter the full 6-digit code.");
      return;
    }
    const email = localStorage.getItem("adminEmail");
    if (!email) {
      navigate("/login");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await verifyAdminOTP(email, enteredCode);
      const token = res.data?.data?.token;
      if (token) {
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminAuth", "true");
        localStorage.removeItem("adminEmail");
      }
      navigate("/");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Invalid or expired OTP. Please try again.";
      setError(msg);
      setCode(Array(OTP_LENGTH).fill(""));
      inputsRef.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  // Verify card
  const verifyCard = (
    <div className="bg-white/95 backdrop-blur-md w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl mx-auto animate-slideUp text-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Enter Code</h2>
      <p className="text-gray-500 text-sm mb-6">
        A 6-digit OTP was sent to <span className="font-semibold">{localStorage.getItem("adminEmail") || "your email"}</span>
      </p>

      <div className="flex justify-between gap-2 mb-4">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            value={digit}
            maxLength="1"
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`flex-1 h-12 sm:h-14 border rounded-md text-center text-xl sm:text-2xl outline-none 
              ${error ? "border-red-500" : "border-gray-300"} focus:border-blue-500`}
          />
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}

      <button
        onClick={handleVerify}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-pink-500 text-white py-2 sm:py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60"
      >
        {loading ? "Verifying…" : "Verify"}
      </button>

      <button
        onClick={() => navigate("/login")}
        className="mt-4 text-sm text-gray-500 hover:text-blue-600 transition"
      >
        ← Back to Login
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