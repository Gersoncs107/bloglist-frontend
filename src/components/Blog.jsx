const Blog = ({ blog }) => (
  <div className="blog">
    <strong>{blog.title}</strong> by {blog.author}
    {blog.url && <p><a href={blog.url}>{blog.url}</a></p>}
  </div>
)

export default Blog