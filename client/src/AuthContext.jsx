import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);

  const login = (userId, authToken, type) => {
    setUser(userId);
    setToken(authToken);
    setUserType(type);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
