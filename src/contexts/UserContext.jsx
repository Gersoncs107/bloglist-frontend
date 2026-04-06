import { createContext, useContext, useReducer } from "react";
import { blogService } from "../services/blogs";
import { userService } from "../services/users";

const UserContext = createContext()

const usereducer = (state, action) => {
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

export const useUSer = () => {
    const [user] = useContext(UserContext)
    return user
}

export const useUserDispatch = () => {
  const [, dispatch] = useContext(UserContext)

  const initializeUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }

  const login = async (credentials) => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({ type: 'SET', payload: user })
    return user
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({ type: 'CLEAR' })
  }

  return { initializeUser, login, logout }
}

export default UserContext