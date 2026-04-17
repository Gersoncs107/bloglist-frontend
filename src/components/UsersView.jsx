import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import userService from '../services/users'

const UsersView = () => {
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 1,
  })

  if (isLoading) return <div>Loading users...</div>
  if (isError) return <div>Failed to load users.</div>

  return (
    <div>
      <h2>Users</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Username</th>
            <th style={thStyle}>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
              <td style={tdStyle}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td style={tdStyle}>{user.username}</td>
              <td style={tdStyle}>{user.blogs ? user.blogs.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const thStyle = {
  textAlign: 'left',
  padding: '12px 8px',
  fontWeight: 'bold',
  borderBottom: '2px solid #e0e0e0',
}

const tdStyle = {
  padding: '12px 8px',
}

export default UsersView
