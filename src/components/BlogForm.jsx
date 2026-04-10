import { useState } from 'react'
import useField from '../hooks/useField'

const BlogForm = ({ handleSubmit }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('url')

  const onSubmit = (e) => {
    e.preventDefault()
    handleSubmit({
       title:  title.inputProps.value,
      author: author.inputProps.value,
      url:    url.inputProps.value
    })
    title.reset()
    author.reset()
    url.reset()
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
