import axios from "axios";
import React, { useEffect } from "react";
import { API_BASE_URL } from "../config/api";
import { getData } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const { setUser } = getData();
  const navigate = useNavigate();
  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      let token = params.get("token");
      
      if (token) {
        // 1. Clean up the token string
        token = token.replace(/\?+$/, "");
        
        // 2. Save to BOTH keys so the whole app stays happy!
        localStorage.setItem("token", token);
        localStorage.setItem("accessToken", token);
        
        try {
          const res = await axios.get(`${API_BASE_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.data.success) {
            setUser(res.data.user);
            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          navigate("/login");
        }
      }
    };
    handleAuth();
  }, [navigate, setUser]);

  return <h1>Logging in...</h1>;
};

export default AuthSuccess;
