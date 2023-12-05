import { createContext, useContext, useState, useEffect } from "react";

export const initial_user = {
  id: "",
  name: "",
  username: "",
  email: "",
  imgUrl: "",
  bio: "",
};

const initial_sate = {
  user: initial_user,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
};

const AuthContext = createContext(initial_sate);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initial_user);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };
  const checkAuthUser = async () => {
    try {
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return <AuthContext.Provider values={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
