import { useState } from 'react'

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    handleSubmit({
      title,
      author,
      url
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Title:
          <input
            id='title-input'
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
            id='author-input'
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
            id='url-input'
            type="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="https://example.com"
          />
        </label>
      </div>

      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm
