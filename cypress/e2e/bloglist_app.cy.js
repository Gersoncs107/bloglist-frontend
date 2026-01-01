describe('Blog app', () => {
  it('front page can be opened', () => {
    cy.visit('http://localhost:5173/')
    cy.contains('Blogs')
  })

  it('Login form is shown', () => {
    cy.visit('http://localhost:5173/')
    cy.contains('username')
    cy.contains('password')
  })
})