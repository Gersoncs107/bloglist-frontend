import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './contexts/NotificationContext'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'
import Blog from './components/Blog'
import './App.css'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  
  const dispatch = useDispatch()
  const notify = useNotificationDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())  
  }, [user])

  const addBlog = async ({ title, author, url }) => {
  if (!title.trim() || !author.trim() || !url.trim()) {
    notify('All fields are required to create a blog.', 5)
    return
  }

  try {
    const newBlog = await dispatch(createBlog({ title, author, url })) // ← thunk
    blogFormRef.current.toggleVisibility()
    notify(`A new blog "${newBlog.title}" by ${newBlog.author} added!`, 5)
  } catch (error) {
    console.error('Failed to create blog:', error)
    notify('Failed to create blog. Please try again.', 5)
  }
}

   const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      await dispatch(loginUser({ username, password }))
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

  const blogForm = () => {
    
    return (
      <Togglable buttonLabel="Create New Blog" ref= {blogFormRef}>
      <BlogForm handleSubmit={addBlog} />

      </Togglable>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={() => dispatch(logoutUser())}>Logout</button>
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