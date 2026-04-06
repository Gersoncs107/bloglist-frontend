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