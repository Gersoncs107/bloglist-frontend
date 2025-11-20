const blogForm = ({
    handleSubmit, 
    handleTitleChange, 
    handleAuthorChange, 
    handleUrlChange, 
    Title, 
    Author, 
    Url}) => {
    return (
        <div>
    <h2>Create new blog</h2>
    <form onSubmit={addBlog}>
      <div>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
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
            onChange={({ target }) => setAuthor(target.value)}
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
            onChange={({ target }) => setUrl(target.value)}
            placeholder="https://example.com"
          />
        </label>
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
    )
  
}