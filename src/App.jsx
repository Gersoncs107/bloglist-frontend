import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import Blog from './components/Blog'
import './App.css'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())  
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)  // ← ESSENCIAL
    }
  }, [])

  const addBlog = async ({ title, author, url }) => {
  if (!title.trim() || !author.trim() || !url.trim()) {
    dispatch(notify('All fields (title, author, url) are required', 5))
    return
  }

  const blogObject = {
    title,
    author,
    url
  }

  try {
    const newBlog = await dispatch(createBlog({ title, author, url })) // ← thunk
    blogFormRef.current.toggleVisibility()
    dispatch(notify(`A new blog "${newBlog.title}" by ${newBlog.author} added`))
  } catch (error) {
    console.error('Failed to create blog:', error)
    dispatch(notify('Failed to save blog. Check server or authentication.', 5))
  }
}

  const handleLogin = async (event) => {
  event.preventDefault()
  
  try {
    const user = await loginService.login({ username, password })

    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    blogService.setToken(user.token)  // ← ESSENCIAL
    setUser(user)
    setUsername('')
    setPassword('')
  } catch (exception) {
    dispatch(notify('Wrong username or password', 5))
  }
}

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>      
  )

  const blogForm = () => {
    
    return (
      <Togglable buttonLabel="Create New Blog" ref= {blogFormRef}>
      <BlogForm handleSubmit={addBlog} />

      </Togglable>
    )
  }

const logOut = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
  setUser(null)
}

  return (
    <div>
      <h1>Blogs</h1>
      <Notification/>

      {!user && loginForm()} 
      {user && <div>
       <p>{user.name} logged in <button onClick={logOut}>Logout</button></p>
         {blogForm()}
         <div>
            <h2>blogs</h2>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes) 
              .map(blog => 
                <Blog 
                  key={blog.id} 
                  blog={blog} 
                  user={user}
                />
              )
            }
      </div>
      </div>
    }
    </div>
  )
}

export default App