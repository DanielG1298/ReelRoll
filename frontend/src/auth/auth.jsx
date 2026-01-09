import { createContext, useContext, useState } from "react";
import { api } from "../api/client.js"; // ✅ use the helper

// auth context var
const AuthContext = createContext();

// export for login, register, and details
export default function AuthProvider({ children }) {
  // token state with local storage
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const register = async (creds) => {
    const response = await fetch(api("/users"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds),
    });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(msg || "Registration failed");
    }

    const result = await response.json();
    setToken(result.token);
    localStorage.setItem("token", result.token);
    return result; // optional but useful
  };

  // login function
  const login = async (creds) => {
    const response = await fetch(api("/users/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds),
    });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(msg);
    }

    const result = await response.json();
    setToken(result.token);
    localStorage.setItem("token", result.token);
    return result; // optional but useful
  };

  // account func
  const account = async () => {
    const response = await fetch(api("/users/me"), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    return response.json();
  };

  // logout func (✅ FIXED)
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // auth context
  const value = { token, register, login, account, logout };
console.log("VITE_API =", import.meta.env.VITE_API);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// auth context export
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
