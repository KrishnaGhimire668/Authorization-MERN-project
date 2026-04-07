import axios from "axios";
import React, { useEffect } from "react";
import { getData } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const { setUser } = getData();
  const navigate = useNavigate();
  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      console.log(params);
      const accessToken = params.get("token");
      console.log("token", accessToken);

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        try {
          const res = await axios.get("http://localhost:5500/auth/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (res.data.success) {
            setUser(res.data.user); // save user in context
            navigate('/')
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    handleAuth()
  },[navigate]);

  return <h1>Logging in...</h1>;
};

export default AuthSuccess;
