import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useOtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const otpCode = otp.join("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: otpCode }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("OTP Verified Successfully");

        // Store the token locally
        if (data.token) {
          localStorage.setItem("authToken", data.token); // Use sessionStorage if token is session-based
        }

        // Redirect based on role
        const userRole = data.user?.role; // Safely access the role property
        if (userRole === "seller") {
          navigate("/seller");
        } else {
          navigate("/");
        }
      } else {
        setError(data.message || "Failed to verify OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while verifying the OTP");
    } finally {
      setLoading(false);
    }
  };

  return { otp, loading, error, handleChange, handleSubmit };
};

export default useOtpVerification;
