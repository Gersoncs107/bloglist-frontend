const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter blog title"
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              type="text"
              value={author}
              onChange={handleAuthorChange}
              placeholder="Enter author name"
            />
          </label>
        </div>
        <div>
          <label>
            URL:
            <input
              type="url"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://example.com"
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm