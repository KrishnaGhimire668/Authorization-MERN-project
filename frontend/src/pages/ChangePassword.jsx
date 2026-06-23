import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from "../config/api";
import { Loader2, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const ChangePassword = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  // --- ALL HIS ORIGINAL STATES ---
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Added state for showing/hiding password (UX improvement)
  const [showPassword, setShowPassword] = useState(false);

  // --- HIS ORIGINAL LOGIC ---
  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      const msg = "Please fill in all fields";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (newPassword !== confirmPassword) {
      const msg = "Passwords do not match";
      setError(msg);
      toast.error(msg);
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${API_BASE_URL}/user/change-password/${email}`, {
        newPassword,
        confirmPassword
      });

      setSuccess(res.data.message);
      toast.success(res.data.message || "Password updated successfully!");
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 px-4 font-sans relative">
      <div className="absolute top-8 left-8">
        <button 
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors font-semibold"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-green-600 w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">New Password</h2>
          <p className="text-sm text-gray-500 mt-2">
            Resetting password for <br />
            <span className="font-semibold text-green-700">{email}</span>
          </p>
        </div>

        {/* HIS LOCAL STATUS DISPLAYS */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center font-medium animate-pulse">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm text-center font-medium">
            {success}
          </div>
        )}

        {/* FORM FIELDS */}
        <div className="space-y-5">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-green-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            onClick={handleChangePassword}
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-200 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChangePassword;