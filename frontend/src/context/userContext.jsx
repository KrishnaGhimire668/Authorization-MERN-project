import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      const isGuest = localStorage.getItem("guest_mode") === "true";

      if (isGuest) {
        setUser({
          username: "Guest User",
          email: "guest@example.com",
          isGuest: true,
          avatar: "",
        });
        setLoading(false);
        return;
      }

      if (token) {
        try {
          const res = await axios.get("http://localhost:5500/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data.success) {
            setUser(res.data.user);
          } else {
            localStorage.removeItem("accessToken");
          }
        } catch (error) {
          console.error("Session restoration failed:", error);
          localStorage.removeItem("accessToken");
        }
      }
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