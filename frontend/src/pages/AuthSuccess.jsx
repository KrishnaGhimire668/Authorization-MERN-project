import React, { useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { getData } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const { setUser } = getData();
  const navigate = useNavigate();
  const hasHandledAuth = useRef(false);

  useEffect(() => {
    if (hasHandledAuth.current) return;
    hasHandledAuth.current = true;

    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const rawToken = params.get("token");
      let token = rawToken;
      
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
            // Force state to update instantly before changing pages
            flushSync(() => {
              setUser(res.data.user);
            });
            navigate("/dashboard", { replace: true });
          } else {
            navigate("/login");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };
    handleAuth();
  }, [navigate, setUser]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-emerald-400">
      <div className="font-mono text-center">
        <div className="animate-pulse">Verifying secure session...</div>
      </div>
    </div>
  );
};

export default AuthSuccess;
