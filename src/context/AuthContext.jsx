import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../lib/apiFunctions";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imgUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  setUser: () => {},
  isLoading: false,
  isAuthenticated: INITIAL_USER.id ? true : false,
  setIsAuthenticated: () => {},
  checkAuthenticatedUser: async () => false,
};

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthenticatedUser = async () => {
    try {
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imgUrl: currentAccount.imgUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    } finally {
      // Set loading state false
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // localStorage.getItem("cookieFallback") === null
    if (localStorage.getItem("cookieFallback") === "[]") navigate("/sign-in");

    checkAuthenticatedUser();
  }, []);

  const values = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthenticatedUser,
    INITIAL_USER,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
