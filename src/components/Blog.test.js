// src/components/BlogForm.test.js
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls handleSubmit with correct details when a new blog is created', async () => {
    const createBlogHandler = jest.fn()
    const user = userEvent.setup()

    // Simula os estados e handlers (como no App.jsx)
    const mockTitle = ''
    const mockAuthor = ''
    const mockUrl = ''
    const mockSetTitle = jest.fn((value) => mockTitle = value)  // Simula atualização de estado
    const mockSetAuthor = jest.fn((value) => mockAuthor = value)
    const mockSetUrl = jest.fn((value) => mockUrl = value)

    render(
      <BlogForm
        handleSubmit={createBlogHandler}
        handleTitleChange={mockSetTitle}
        handleAuthorChange={mockSetAuthor}
        handleUrlChange={mockSetUrl}
        title={mockTitle}
        author={mockAuthor}
        url={mockUrl}
      />
    )

    // Preenche os campos (agora os onChange atualizam os mocks)
    await user.type(screen.getByPlaceholderText('Enter blog title'), 'Testing com Jest')
    await user.type(screen.getByPlaceholderText('Enter author name'), 'Maria Dev')
    await user.type(screen.getByPlaceholderText('https://example.com'), 'https://mariajest.dev')

    // Envia o formulário
    await user.click(screen.getByText('Create'))

    // Verificações
    expect(createBlogHandler).toHaveBeenCalledTimes(1)
    expect(createBlogHandler).toHaveBeenCalledWith({
      title: 'Testing com Jest',
      author: 'Maria Dev',
      url: 'https://mariajest.dev'
    })
  })
})