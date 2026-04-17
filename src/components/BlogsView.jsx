import { useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../contexts/NotificationContext.jsx'
import blogService from '../services/blogs'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogsView = ({ user }) => {
  const notify = useNotificationDispatch()
  const queryClient = useQueryClient()
  const blogFormRef = useRef()

  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.setQueryData(['blogs'], (blogs) => [...blogs, newBlog])
      blogFormRef.current.toggleVisibility()
      notify(`A new blog "${newBlog.title}" by ${newBlog.author} added!`, 5)
    },
    onError: () => {
      notify('Failed to create blog. Please try again.', 5)
    },
  })

  const addBlog = ({ title, author, url }) => {
    if (!title.trim() || !author.trim() || !url.trim()) {
      notify('All fields are required to create a blog.', 5)
      return
    }
    newBlogMutation.mutate({ title, author, url })
  }

  if (isLoading) return <div>Loading blogs...</div>
  if (isError) return <div>Failed to load blogs.</div>

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
        <BlogForm handleSubmit={addBlog} />
      </Togglable>

      <div style={{ marginTop: '16px' }}>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
      </div>
    </div>
  )
}

export default BlogsView
