import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import userService from '../services/users'

const UserView = () => {
  const { id } = useParams()

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load user.</div>

  const user = users.find((u) => u.id === id)

  if (!user) return <div>User not found.</div>

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs &&
          user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
      </ul>
      <Link to="/users">← back to users</Link>
    </div>
  )
}

export default UserView
