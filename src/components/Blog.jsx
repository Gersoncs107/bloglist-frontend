import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => setVisible(!visible)

  const canRemove = blog.user && user && blog.user.username === user.username

  const handleLike = async () => {
    const userId = blog.user && typeof blog.user === 'object'
      ? blog.user.id || blog.user._id
      : blog.user

    const updatedBlog = {
      user: userId,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    const response = await updateBlog(blog.id, updatedBlog)
    setLikes(response.likes)
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await deleteBlog(blog.id)
    }
  }

  const blogStyle = {
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '15px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  }

  const labelStyle = {
    fontWeight: 'bold',
    marginRight: '10px'
  }

  return (
    <div style={blogStyle} className="blog">
      <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong>{blog.title}</strong> by <em>{blog.author}</em>
        </div>
        <button id="view-button" onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div style={{ marginTop: '10px', paddingLeft: '10px' }}>
          <div><span style={labelStyle}>URL:</span> <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></div>
          <div style={{ marginTop: '8px' }}>
            <span style={labelStyle}>Likes:</span> {likes}
            <button id="like-button" style={{ marginLeft: '10px' }} onClick={handleLike}>like</button>
          </div>
          <div style={{ marginTop: '8px' }}>
            <span style={labelStyle}>Added by:</span> {blog.user?.name || 'unknown'}
          </div>
          {canRemove && (
            <div style={{ marginTop: '12px' }}>
              <button id="remove-button" style={{ backgroundColor: '#d9534f', color: 'white' }} onClick={handleRemove}>
                Remove
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog