import React, { useContext, createContext } from 'react'
import PropTypes from 'prop-types'
import { useLocalStorage } from 'react-use'

const AuthContext = createContext()

const useAuth = () => useContext(AuthContext)

const useAuthProvider = () => {
  // localstorage
  const [token, setToken, removeToken] = useLocalStorage(process.env.NEXT_PUBLIC_TOKEN, null)

  const [userId, setUserId, removeUserId] = useLocalStorage('userId', null)

  const [userDept, setUserDept, removeUserDept] = useLocalStorage('userDept', null)

  const [userName, setUserName, removeUserName] = useLocalStorage('userName', null)

  const signOut = () => {
    removeToken()
    removeUserId()
    removeUserDept()
    removeUserName()
  }

  const setAuthToken = inputToken => {
    setToken(inputToken)
  }

  const localStore = result => {
    setUserId(result.userId)
    setUserName(result.userName)
    setAuthToken(result.ctlToken)
  }

  return {
    userId,
    userName,
    userDept,
    token,
    setToken,
    removeToken,
    localStore,
    signOut,
  }
}

const AuthProvider = ({ children }) => {
  const auth = useAuthProvider()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default useAuth
export { AuthProvider }

AuthProvider.propTypes = {
  children: PropTypes.node,
}
