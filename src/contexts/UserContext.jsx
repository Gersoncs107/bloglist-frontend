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