import React, { createContext, use, useContext, useState } from "react";
const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(""); // Default role

  const login = (userData) => {
    setUser(userData);
    setRole(userData.role); // Assuming userData has a role property
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <UserContext.Provider
      value={{ user, role, setRole, login, logout, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
