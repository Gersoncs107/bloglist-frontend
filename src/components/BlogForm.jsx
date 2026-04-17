import useField from '../hooks/useField'

const BlogForm = ({ handleSubmit }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('url')

  const onSubmit = (e) => {
    e.preventDefault()
    handleSubmit({
      title: title.inputProps.value,
      author: author.inputProps.value,
      url: url.inputProps.value,
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
            id="title-input"
            {...title.inputProps}
            placeholder="Enter blog title"
          />
        </label>
      </div>
      <div>
        <label>
          Author:
          <input
            id="author-input"
            {...author.inputProps}
            placeholder="Enter author name"
          />
        </label>
      </div>
      <div>
        <label>
          URL:
          <input
            id="url-input"
            {...url.inputProps}
            placeholder="https://example.com"
          />
        </label>
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm
