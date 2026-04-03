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

export const useNotification = () => {
    const notification = useContext(notificationContext)
    if (notification === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider')
    }
    return notification
}

export const usenotificationDispatch = () => {
    const [, dispatch] = useContext(notificationContext)

    const notify = (message, seconds = 5) => {
    dispatch({ type: 'SET', payload: message })
    setTimeout(() => dispatch({ type: 'CLEAR' }), seconds * 1000)
  }

  return notify

}

export default notificationContext