import { useState } from "react";
import type { ReactNode } from "react";
import type { User, LoginRequest, RegisterRequest } from "../types";
import { authAPI } from "../services/api";
import { AuthContext } from "./authContextDef";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const login = async (data: LoginRequest) => {
    try {
      const response = await authAPI.login(data);
      setToken(response.token);
      const userData: User = {
        id: response.id,
        username: response.username,
        email: response.email,
        fullName: response.fullName,
      };
      setUser(userData);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response = await authAPI.register(data);
      setToken(response.token);
      const userData: User = {
        id: response.id,
        username: response.username,
        email: response.email,
        fullName: response.fullName,
      };
      setUser(userData);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
