import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  ho
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  ging
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '0 24px', marginTop: '16px' }}>
          <h2>Something went wrong :(</h2>
          <p>
            Please make a bug report to{' '}
            <strong>{this.props.reportTo || 'the development team'}</strong> on
            Discord
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
