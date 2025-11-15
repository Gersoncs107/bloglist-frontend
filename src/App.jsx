import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import './App.css'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)  // ← ESSENCIAL
    }
  }, [])

  const addBlog = async (event) => {
  event.preventDefault()

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
    setBlogs(blogs.concat(returnedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  } catch (error) {
    console.error('Failed to create blog:', error)
    setErrorMessage('Failed to save blog. Check server or authentication.')
    setTimeout(() => setErrorMessage(null), 5000)
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
    setErrorMessage('Wrong credentials')
    setTimeout(() => setErrorMessage(null), 5000)
  }
}

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
  <div>
    <h2>Create new blog</h2>
    <form onSubmit={addBlog}>
      <div>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Enter blog title"
          />
        </label>
      </div>
      <div>
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Enter author name"
          />
        </label>
      </div>
      <div>
        <label>
          URL:
          <input
            type="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="https://example.com"
          />
        </label>
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
)

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
       <p>{user.name} logged in</p><button onClick={logOut}>Logout</button>
         {blogForm()}
         <div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
         </div>
      </div>
    }

      {/* <h2>Log in to application</h2> */}
      {/* <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form> */}

      {/* <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} */}
    </div>
  )
}

export default App