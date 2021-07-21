import React, { useContext, createContext } from "react";

import useLocalStorage from "../_useLocalStorage/useLocalStorage"
import useLocalState from "./useLocalState";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const useAuthProvider = () => {
  const { setUser } = useLocalState();

  // localstorage
  const [token, setToken, removeToken] = useLocalStorage(
    process.env.REACT_APP_TOKEN,
    null
  );

  const [userId, setUserId, removeUserId] = useLocalStorage(
    'userId',
    null
  )

  const [userName, setUserName, removeUserName] = useLocalStorage(
    'userName',
    null
  )

  const signOut = () => {
    removeToken()
    removeUserId()
  };

  return {
    token, setToken,
    userId, setUserId, removeUserId,
    userName, setUserName, removeUserName,
    signOut
  };
};

const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default useAuth;
export { AuthProvider };
