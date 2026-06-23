import React, { useEffect } from "react";
import { flushSync } from "react-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { getData } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const { setUser } = getData();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const rawToken = params.get("token");
  const cleanedToken = rawToken ? rawToken.replace(/\?+$/, "") : null;

  useEffect(() => {
    const handleAuth = async () => {
      let token = rawToken;
      const meRequestUrl = `${API_BASE_URL}/auth/me`;

      // #region agent log
      fetch('http://127.0.0.1:7590/ingest/483ca22c-7f96-40a0-b1d6-7e2a8538b3e7',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f266e3'},body:JSON.stringify({sessionId:'f266e3',runId:'pre-fix',hypothesisId:'H2-H3',location:'AuthSuccess.jsx:19',message:'AuthSuccess handleAuth start',data:{pageUrl:window.location.href,pageOrigin:window.location.origin,pagePath:window.location.pathname,apiBaseUrl:API_BASE_URL,meRequestUrl,hasToken:Boolean(token),tokenLength:token?token.length:0},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      
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
            // #region agent log
            fetch('http://127.0.0.1:7590/ingest/483ca22c-7f96-40a0-b1d6-7e2a8538b3e7',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f266e3'},body:JSON.stringify({sessionId:'f266e3',runId:'pre-fix',hypothesisId:'H3',location:'AuthSuccess.jsx:38',message:'/auth/me success',data:{meRequestUrl,status:res.status,success:res.data.success},timestamp:Date.now()})}).catch(()=>{});
            // #endregion
            // Force state to update instantly before changing pages
            flushSync(() => {
              setUser(res.data.user);
            });
            navigate("/dashboard", { replace: true });
          } else {
            navigate("/login");
          }
        } catch (error) {
          // #region agent log
          fetch('http://127.0.0.1:7590/ingest/483ca22c-7f96-40a0-b1d6-7e2a8538b3e7',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f266e3'},body:JSON.stringify({sessionId:'f266e3',runId:'pre-fix',hypothesisId:'H1-H3-H4',location:'AuthSuccess.jsx:49',message:'/auth/me failed',data:{meRequestUrl,errorMessage:error?.message||null,status:error?.response?.status||null,responseUrl:error?.response?.config?.url||null},timestamp:Date.now()})}).catch(()=>{});
          // #endregion
          console.error("Error fetching user:", error);
          navigate("/login");
        }
      } else {
        // #region agent log
        fetch('http://127.0.0.1:7590/ingest/483ca22c-7f96-40a0-b1d6-7e2a8538b3e7',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f266e3'},body:JSON.stringify({sessionId:'f266e3',runId:'pre-fix',hypothesisId:'H3',location:'AuthSuccess.jsx:58',message:'No token in URL, redirecting to login',data:{pageUrl:window.location.href,search:window.location.search},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        navigate("/login");
      }
    };
    handleAuth();
  }, [navigate, rawToken, setUser]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-emerald-400">
      <div className="font-mono text-center">
        <div className="animate-pulse">Verifying secure session...</div>
        <div className="mt-4 text-xs text-emerald-300 break-all max-w-xl">
          <div>API_BASE_URL: {API_BASE_URL}</div>
          <div>token: {cleanedToken || "null"}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;
