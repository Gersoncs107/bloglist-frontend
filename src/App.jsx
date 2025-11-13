import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import './App.css'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const addBlog = async (event) => {
        event.preventDefault()

        if (!newBlog || newBlog.trim() === '') {
          setErrorMessage('Blog content cannot be empty')
          setTimeout(() => setErrorMessage(null), 3000)
          return
        }

        const blogObject = {
         title: newBlog
        }

        try {
          const returnedBlog = await blogService.create(blogObject)
          setBlogs(blogs.concat(returnedBlog))
          setNewBlog('')
        } catch (error) {
          console.error('Failed to create blog:', error)
          setErrorMessage('Failed to save blog (check server).')
          setTimeout(() => setErrorMessage(null), 5000)
        }
    }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
    <form onSubmit={addBlog}>
      <input
        value={newBlog}
        onChange={handleBlogChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()} 
    {user && <div>
       <p>{user.name} logged in</p>
         {blogForm()}
      </div>
    }

      <h2>Log in to application</h2>
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

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App