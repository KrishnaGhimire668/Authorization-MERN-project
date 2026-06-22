import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle, Loader2, ArrowLeft, Mail } from "lucide-react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:5500/user/forgot-password`,
        {
          email,
        }
      );
      if (res.data.success) {
        navigate(`/verify-otp/${email}`)
        toast.success(res.data.message);
        setEmail('');
        
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-green-100 min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute top-8 left-8">
        <button 
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors font-semibold"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Title Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-green-600">
            Reset Your Password
          </h1>
          <p className="text-gray-600">
            Enter your email address and we'll send you instructions
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8">
            {isSubmitted ? (
              /* Success State */
              <div className="text-center space-y-4 py-4">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Check your inbox
                  </h3>
                  <p className="text-gray-500">
                    We've sent a password reset link to <br />
                    <span className="font-medium text-green-600">{email}</span>
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/verify-otp/${email}`)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Enter OTP
                </button>
                <p className="text-sm text-gray-400">
                  Didn't receive the email?{" "}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-green-600 hover:underline font-medium"
                  >
                    Try again
                  </button>
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending reset link...
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
