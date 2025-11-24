const Blog = ({ blog, details }) => {
   const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

return (
  <div  style={blogStyle}>
    <div className="blog">
    <strong>{blog.title}</strong> by {blog.author} <button onClick={details}>View</button>
  </div>
  </div>
  
)}
export default Blog