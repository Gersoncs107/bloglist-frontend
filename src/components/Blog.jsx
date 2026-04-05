import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user}) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const toggleVisibility = () => setVisible(!visible)

  const canRemove = blog.user && user && blog.user.username === user.username

  const likeMutation = useMutation({
    mutationFn: (blogToLike) => {
      const userId = blogToLike.user && typeof blogToLike.user === 'object'
        ? blogToLike.user.id || blogToLike.user._id
        : blogToLike.user

      return blogService.update(blogToLike.id, {
        user: userId,
        likes: blogToLike.likes + 1,
        author: blogToLike.author,
        title: blogToLike.title,
        url: blogToLike.url
      })
    },
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], blogs =>
        blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b)
      )
    }
  })

   const deleteMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.setQueryData(['blogs'], blogs =>
        blogs.filter(b => b.id !== blog.id)
      )
    }
  })


  const handleLike = async () => {
    await likeMutation.mutateAsync(blog)
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await dispatch(deleteBlog(blog.id))
    }
  }

  const labelStyle = {
    fontWeight: 'bold',
    marginRight: '10px'
  }

  return (
    <div className="blog">
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
            <span style={labelStyle}>Likes:</span>{blog.likes}
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