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
  const [likes, setLikes] = useState(0) // opcional, pode ser removido se o backend definir 0
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

  if (!title.trim() || !author.trim() || !url.trim()) {
    setErrorMessage('Title, author, and URL are required')
    setTimeout(() => setErrorMessage(null), 3000)
    return
  }

  const blogObject = {
    title,
    author,
    url,
    likes: likes || 0
  }

  try {
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes(0)
  } catch (error) {
    console.error('Failed to create blog:', error)
    setErrorMessage('Failed to save blog. Check server or authentication.')
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

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
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
      <div>
        <label>
          Likes:
          <input
            type="number"
            value={likes}
            onChange={({ target }) => setLikes(Number(target.value))}
            min="0"
          />
        </label>
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
)

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()} 
    {user && <div>
       <p>{user.name} logged in</p>
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