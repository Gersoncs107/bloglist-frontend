import { Link } from 'react-router-dom'

const NavBar = ({ user, logout }) => {
  return (
    <nav
      style={{
        backgroundColor: '#1a73e8',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        marginBottom: '24px',
      }}
    >
      <Link
        to="/"
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: '20px',
          textDecoration: 'none',
        }}
      >
        Blog App
      </Link>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link to="/" style={navLinkStyle}>
          BLOGS
        </Link>
        <Link to="/users" style={navLinkStyle}>
          USERS
        </Link>
        {user && (
          <>
            <Link to="/" style={navLinkStyle}>
              NEW BLOG
            </Link>{' '}
            <span
              onClick={logout}
              style={{ ...navLinkStyle, cursor: 'pointer' }}
            >
              LOGOUT
            </span>
          </>
        )}
      </div>
    </nav>
  )
}

const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '14px',
  letterSpacing: '0.5px',
}

export default NavBar
