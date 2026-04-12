import { Link } from "react-router-dom"                 

const Blog = ({ blog }) => {
  
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
          <div>
            <span style={labelStyle}>URL:</span>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
          </div>
          <div style={{ marginTop: '8px' }}>
            <span style={labelStyle}>Likes:</span> {blog.likes}
            <button
              id="like-button"
              style={{ marginLeft: '10px' }}
              onClick={handleLike}
              disabled={likeMutation.isPending}
            >
              like
            </button>
          </div>
          <div style={{ marginTop: '8px' }}>
            <span style={labelStyle}>Added by:</span> {blog.user?.name || 'unknown'}
          </div>
          {canRemove && (
            <div style={{ marginTop: '12px' }}>
              <button
                id="remove-button"
                style={{ backgroundColor: '#d9534f', color: 'white' }}
                onClick={handleRemove}
                disabled={deleteMutation.isPending}
              >
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