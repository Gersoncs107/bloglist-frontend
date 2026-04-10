import { useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './contexts/NotificationContext.jsx'
import { useUser, useUserDispatch } from './contexts/UserContext.jsx'
import useField from './hooks/useField.js'
import Blog from './components/Blog'
import './App.css'
import Notification from './components/Notification'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const notify = useNotificationDispatch()
  const user = useUser()    
  const { initializeUser, login, logout } = useUserDispatch()
  const blogFormRef = useRef()
  const queryClient = useQueryClient()

  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    initializeUser()
  }, [])

  const { data: blogs = [], isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.setQueryData(['blogs'], blogs => [...blogs, newBlog])
      blogFormRef.current.toggleVisibility()
      notify(`A new blog "${newBlog.title}" by ${newBlog.author} added!`, 5)
    },
    onError: () => {
      notify('Failed to create blog. Please try again.', 5)
    }
  })

  const addBlog = ({ title, author, url }) => {
    if (!title.trim() || !author.trim() || !url.trim()) {
      notify('All fields are required to create a blog.', 5)
      return
    }
    newBlogMutation.mutate({ title, author, url })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      await login({ username, password })
    } catch (exception) {
      notify('Wrong username or password', 5)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input id="username" type="text" name="username" />
      </div>
      <div>
        password
        <input id="password" type="password" name="password" />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
      <BlogForm handleSubmit={addBlog} />
    </Togglable>
  )

  if (isLoading) return <div>Loading blogs...</div>
  if (isError) return <div>Failed to load blogs.</div>

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={logout}>Logout</button>
          </p>
          {blogForm()}
          <div>
            <h2>blogs</h2>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <Blog key={blog.id} blog={blog} user={user} />
              )
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default App