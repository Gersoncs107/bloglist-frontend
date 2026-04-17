import { createContext, useContext, useReducer } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import persistentUser from '../services/persistentUser'

const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const [user] = useContext(UserContext)
  return user
}

export const useUserDispatch = () => {
  const [, dispatch] = useContext(UserContext)

  const initializeUser = () => {
    const user = persistentUser.getUser()
    if (user) {
      dispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }

  const login = async (credentials) => {
    const user = await loginService.login(credentials)
    persistentUser.saveUser(user)
    blogService.setToken(user.token)
    dispatch({ type: 'SET', payload: user })
    return user
  }

  const logout = () => {
    persistentUser.removeUser()
    dispatch({ type: 'CLEAR' })
  }

  return { initializeUser, login, logout }
}

export default UserContext
