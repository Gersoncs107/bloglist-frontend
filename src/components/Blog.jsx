import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => setVisible(!visible)

  const canRemove = blog.user && user && blog.user.username === user.username

  const handleLike = async () => {
    const userId =
      blog.user && typeof blog.user === 'object'
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

  return (
    <div className="blog">
      <div className="blog-header">
        <div>
          <span className="blog-title">{blog.title}</span>{' '}
          by{' '}
          <span className="blog-author">{blog.author}</span>
        </div>
        <button id="view-button" onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div className="blog-details">
          <div className="blog-detail-row">
            <span className="blog-label">URL:</span>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </div>

          <div className="blog-detail-row blog-like-section">
            <span className="blog-label">Likes:</span>
            {likes}
            <button id="like-button" onClick={handleLike}>
              like
            </button>
          </div>

          <div className="blog-detail-row">
            <span className="blog-label">Added by:</span>
            {blog.user?.name || 'unknown'}
          </div>

          {canRemove && (
            <div className="blog-remove-section">
              <button id="remove-button" onClick={handleRemove}>
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