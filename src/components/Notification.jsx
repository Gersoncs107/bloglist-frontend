import { useNotification } from '../contexts/NotificationContext'

const Notification = () => {
  const message = useNotification()
  if (message === null) {
    return null
  }
  return <div className="notification">{message}</div>
}

export default Notification
