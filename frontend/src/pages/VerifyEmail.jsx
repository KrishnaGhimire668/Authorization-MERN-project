import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const VerifyEmail = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[760px] overflow-hidden">
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 px-4 relative">
        <div className="absolute top-8 left-8">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors font-semibold"
          >
            <ArrowLeft size={20} /> Back to Home
          </button>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            ✅ Check Your Email
          </h2>
          <p className="text-gray-400 text-sm">
            We've sent you an email to verify your account. Please check your
            inbox and click the verification link
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
