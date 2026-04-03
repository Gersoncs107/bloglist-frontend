import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { NotificationProvider } from './contexts/NotificationContext'
import App from './App'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </Provider>
)