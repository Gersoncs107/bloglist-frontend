import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls handleSubmit with correct details when a new blog is created', async () => {
    const createBlogHandler = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm handleSubmit={createBlogHandler} />)

    // Preenche os campos
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