const Blog = ({ blog }) => {
   const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

return (
  
  <div className="blog" style={blogStyle}>
    <strong>{blog.title}</strong> by {blog.author}
  </div>
)}
export default Blog