import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import useField from '../hooks/useField'

const BlogView = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const comment = useField('text')

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogService.getById(id),
    retry: 1,
  })

  const likeMutation = useMutation({
    mutationFn: (blogToLike) => {
      const userId =
        blogToLike.user && typeof blogToLike.user === 'object'
          ? blogToLike.user.id || blogToLike.user._id
          : blogToLike.user

      return blogService.update(blogToLike.id, {
        user: userId,
        likes: blogToLike.likes + 1,
        author: blogToLike.author,
        title: blogToLike.title,
        url: blogToLike.url,
      })
    },
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blog', id], (old) => ({
        ...old,
        likes: updatedBlog.likes,
      }))
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const commentMutation = useMutation({
    mutationFn: (text) => blogService.addComment(id, text),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blog', id], updatedBlog)
      comment.reset()
    },
  })

  const handleComment = (e) => {
    e.preventDefault()
    if (!comment.inputProps.value.trim()) return
    commentMutation.mutate(comment.inputProps.value)
  }

  if (isLoading) return <div>Loading blog...</div>
  if (isError) return <div>Blog not found.</div>

  const containerStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '32px',
    maxWidth: '700px',
    marginTop: '16px',
  }

  return (
    <div style={containerStyle}>
      <h2>{blog.title}</h2>
      <p style={{ margin: '4px 0' }}>by {blog.author}</p>
      <p style={{ margin: '8px 0' }}>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </p>
      <p style={{ margin: '8px 0', color: '#555' }}>
        Added by {blog.user?.name || 'unknown'}
      </p>

      <p
        style={{
          margin: '16px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <strong>{blog.likes} likes</strong>
        <button
          onClick={() => likeMutation.mutate(blog)}
          disabled={likeMutation.isPending}
          style={{
            padding: '4px 16px',
            border: '1px solid #aaa',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: 'white',
          }}
        >
          LIKE
        </button>
      </p>

      <h3 style={{ marginTop: '24px' }}>comments</h3>

      <form
        onSubmit={handleComment}
        style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}
      >
        <input
          {...comment.inputProps}
          placeholder="write a comment..."
          style={{
            flex: 1,
            padding: '6px 10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          type="submit"
          disabled={commentMutation.isPending}
          style={{
            padding: '6px 16px',
            backgroundColor: '#1a73e8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          add comment
        </button>
      </form>

      <ul>
        {blog.comments && blog.comments.length > 0 ? (
          blog.comments.map((c, i) => <li key={i}>{c}</li>)
        ) : (
          <li style={{ color: '#888' }}>No comments yet.</li>
        )}
      </ul>

      <Link
        to="/"
        style={{ display: 'inline-block', marginTop: '16px', color: '#1a73e8' }}
      >
        ← back to blogs
      </Link>
    </div>
  )
}

export default BlogView
