import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import './App.css'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
    setErrorMessage('Title, author, and URL are required')
    setTimeout(() => setErrorMessage(null), 3000)
    return
  }

  const blogObject = {
    title,
    author,
    url
  }



  try {
    const returnedBlog = await blogService.create(blogObject)
    blogFormRef.current.toggleVisibility()
    setBlogs(prevBlogs => prevBlogs.concat(returnedBlog))
    setErrorMessage(`A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`)
    setTimeout(() => setErrorMessage(null), 5000)
  } catch (error) {
    console.error('Failed to create blog:', error)
    setErrorMessage('Failed to save blog. Check server or authentication.')
    setTimeout(() => setErrorMessage(null), 5000)
  }
}

  const updateBlog = async (id, newObject) => {
  const updated = await blogService.update(id, newObject)
  setBlogs(blogs.map(b => (b.id === id ? updated : b)))
  return updated
}

  const removeBlog = async (id) => {
  await blogService.remove(id)
  setBlogs(blogs.filter(b => b.id !== id))
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
    setErrorMessage('Wrong credentials')
    setTimeout(() => setErrorMessage(null), 5000)
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
      <Notification message={errorMessage} />

      {!user && loginForm()} 
      {user && <div>
       <p>{user.name} logged in <button onClick={logOut}>Logout</button></p>
         {blogForm()}
         <div>
            <h2>blogs</h2>
            {blogs
              .sort((a, b) => b.likes - a.likes) 
              .map(blog => 
                <Blog 
                  key={blog.id} 
                  blog={blog} 
                  user={user} 
                  updateBlog={updateBlog} 
                  deleteBlog={removeBlog}
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