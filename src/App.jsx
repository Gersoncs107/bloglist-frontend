import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useNotificationDispatch } from './contexts/NotificationContext.jsx'
import { useUser, useUserDispatch } from './contexts/UserContext.jsx'
import useField from './hooks/useField.js'
import NavBar from './components/NavBar'
import BlogsView from './components/BlogsView'
import BlogView from './components/BlogView.jsx'
import UsersView from './components/UsersView'
import UserView from './components/UserView.jsx'
import Notification from './components/Notification'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './App.css'
import NotFound from './components/NotFound.jsx'

const App = () => {
  const notify = useNotificationDispatch()
  const user = useUser()
  const { initializeUser, login, logout } = useUserDispatch()

  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    initializeUser()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await login({
        username: username.inputProps.value,
        password: password.inputProps.value,
      })
      username.reset()
      password.reset()
    } catch (exception) {
      notify('Wrong username or password', 5)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id="username" {...username.inputProps} />
        </div>
        <div>
          password
          <input id="password" {...password.inputProps} />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )

  return (
    <div>
      <NavBar user={user} logout={logout} />

      <ErrorBoundary reportTo="Gerson#0001">
        <div style={{ padding: '0 24px' }}>
          <Notification />
          {!user ? (
            loginForm()
          ) : (
            <Routes>
              <Route path="/" element={<BlogsView user={user} />} />
              <Route path="/blogs/:id" element={<BlogView user={user} />} />
              <Route path="/users" element={<UsersView />} />
              <Route path="/users/:id" element={<UserView />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </div>
      </ErrorBoundary>
    </div>
  )
}

export default App
