import { createContext, useState } from "react";
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [isLogin, setisLogin] = useState(true);
  const [loading, setloading] = useState(true);

  const login = () => {
    setisLogin(true);
    setloading(false);
  };

  const logout = () => {
    setisLogin(false);
    setloading(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
