// src/components/BlogForm.test.js
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    
  test('calls handleSubmit with correct details when a new blog is created', async () => {
    const createBlogHandler = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm handleSubmit={createBlogHandler} />)

    const titleInput = screen.getByPlaceholderText('Enter blog title')
    const authorInput = screen.getByPlaceholderText('Enter author name')
    const urlInput = screen.getByPlaceholderText('https://example.com')

    await user.type(titleInput, 'Testing com Jest')
    await user.type(authorInput, 'Maria Dev')
    await user.type(urlInput, 'https://mariajest.dev')

    const createButton = screen.getByText('Create')
    await user.click(createButton)

    expect(createBlogHandler).toHaveBeenCalledTimes(1)
    expect(createBlogHandler).toHaveBeenCalledWith({
      title: 'Testing com Jest',
      author: 'Maria Dev',
      url: 'https://mariajest.dev'
    })
  })
})