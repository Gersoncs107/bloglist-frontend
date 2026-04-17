import { Link } from 'react-router-dom' // ← novo

const Blog = ({ blog }) => {
  return (
    <div
      className="blog"
      style={{
        padding: '10px 0',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <Link
          to={`/blogs/${blog.id}`}
          style={{ fontWeight: 'bold', marginRight: '8px' }}
        >
          {blog.title}
        </Link>
        <em>by {blog.author}</em>
      </div>
      <span style={{ color: '#555' }}>{blog.likes} likes</span>
    </div>
  )
}

export default Blog
