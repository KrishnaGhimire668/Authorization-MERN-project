import axios from 'axios'
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";
import {useNavigate, useParams } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying....");
  const navigate = useNavigate()

  useEffect(() => {
    const VerifyEmail = async () => {
      try {
        const res = await axios.post(
          `${API_BASE_URL}/user/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          setStatus("✅ Email Verified Successfully");
          setTimeout(() => {
            navigate('/login')
          })
        }else{
          setStatus('❌ Invalid or Expired Token')
        }
      } catch (error) {
        console.log(error);
        setStatus("❌ Verification failed. Please try again");
      }
    }
    VerifyEmail()
  }, [token, navigate])

  return (
    <div className="relative w-full h-[760px] bg-green-100 overflow-hidden">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md text-center w-[90%] max-w-md">
          <h2 className="text-xl font-semibold text-gray-800">{status}</h2>
        </div>
      </div>
    </div>
  );
};

export default Verify;
