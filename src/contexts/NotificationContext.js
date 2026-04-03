import { createContext, useContext, useReducer } from "react";

const notificationContext = createContext()

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'CLEAR':
            return null
        default:
            return state
    }
}

export const notificationProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, null)

    return (
        <notificationContext.Provider value={{ notification, dispatch }}>
            {children}
        </notificationContext.Provider>
    )
}

export default notificationContext