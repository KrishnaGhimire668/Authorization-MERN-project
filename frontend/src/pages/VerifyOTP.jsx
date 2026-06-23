import React, { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from "../config/api";
import { CheckCircle, Loader2, RotateCcw, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const VerifyOTP = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const { email } = useParams();
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    // Only allow numbers
    if (isNaN(value)) return;

    if (value.length > 1) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${API_BASE_URL}/user/verify-otp/${email}`, {
        otp: finalOtp,
      });

      if (res.data.success) {
        setIsVerified(true);
        toast.success(res.data.message || "OTP Verified!");
        setTimeout(() => {
          navigate(`/change-password/${email}`);
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-100 items-center justify-center p-4 relative">
      <div className="absolute top-8 left-8">
        <button 
          onClick={() => navigate("/forgot-password")}
          className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors font-semibold"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      <div className="w-full max-w-md space-y-6">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-green-600">Verify your email</h1>
          <p className="text-gray-600">
            We've sent a 6-digit code to <br />
            <span className="font-medium text-green-700">{email || "your email"}</span>
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8">
            {isVerified ? (
              /* Success State */
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-green-100 rounded-full p-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-xl text-gray-800">Verification Successful</h3>
                  <p className="text-gray-500">Redirecting you to reset your password...</p>
                </div>
                <Loader2 className="h-6 w-6 animate-spin text-green-600" />
              </div>
            ) : (
              /* Input State */
              <div className="space-y-6">
                <h2 className="text-center text-lg font-semibold text-gray-700">Enter verification code</h2>
                
                {/* OTP Inputs */}
                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      ref={(el) => (inputRefs.current[index] = el)}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      maxLength={1}
                      className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    />
                  ))}
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleVerify}
                    disabled={isLoading || otp.some((d) => d === "")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify Code"
                    )}
                  </button>

                  <button
                    onClick={clearOtp}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors"
                  >
                    <RotateCcw size={16} />
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

    
      </div>
    </div>
  );
};

export default VerifyOTP;