import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const res = await axios.get(`${API_BASE_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data.success) {
            setUser(res.data.user);
            localStorage.removeItem("guest_mode");
            setLoading(false);
            return;
          } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Session restoration failed:", error);
          if (error?.response?.status === 404) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("token");
            setUser(null);
            setLoading(false);
            return;
          }
        }
      }

      setUser({
        username: "Guest User",
        email: "guest@example.com",
        isGuest: true,
        avatar: "",
      });
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const getData = () => useContext(UserContext);