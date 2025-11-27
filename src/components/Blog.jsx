import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
  const userId =
    blog.user && typeof blog.user === 'object'
      ? blog.user.id || blog.user._id
      : blog.user; // se for apenas um ID string

  const updatedBlog = {
    user: userId,
    likes: likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }
  
  const canRemove =
  blog.user &&
  user &&
  blog.user.username === user.username


  const response = await updateBlog(blog.id, updatedBlog)
  setLikes(response.likes)
}

  const handleRemove = async () => {
  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
    await deleteBlog(blog.id)
  }
}

  return (
    <div style={blogStyle} className="blog">
      <div>
        <strong>{blog.title}</strong> — {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {likes} 
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          <div>
            <button onClick={handleRemove}>Remove</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
