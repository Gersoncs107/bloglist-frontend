describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173/')
  })

  it('Login form is shown', () => {
    cy.visit('http://localhost:5173/')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', () => {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.notification')
      cy.get('html').should('not.contain', 'Superuser logged in')
    })
  })
})