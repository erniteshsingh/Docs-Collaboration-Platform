import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = async (formData) => {
    const res = await axios.post("/api/v1/auth/login", formData);

    const { user } = res.data;

    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);

    return res.data;
  };

  const register = async (formData) => {
    const res = await axios.post("/api/v1/auth/register", formData);

    const { user } = res.data;

    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);

    return res.data;
  };

  const logoutUser = async () => {
    await axios.post("/api/v1/auth/logout");

    localStorage.removeItem("user");
    setUser(null);
  };

  const profile = async () => {
    try {
      const res = await axios.get("/api/v1/users/me");
      setUserProfile(res.data);
    } catch (err) {
      console.error("Profile fetch failed", err);
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    login,
    register,
    logoutUser,
    profile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
