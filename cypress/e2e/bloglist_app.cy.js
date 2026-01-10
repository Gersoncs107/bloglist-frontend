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
  
  describe('When logged in', () => {
    beforeEach(() => {
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })
    it('A blog can be created', () => {
      cy.contains('Create New Blog').click()
      cy.get('#title-input').type('A blog created by cypress')
      cy.get('input[placeholder="Enter author name"]').type('Cypress Author')
      cy.get('input[placeholder="https://example.com"]').type('https://cypress.io')
      cy.get('form').contains('Create').click()
      cy.get('.blog').should('contain', 'A blog created by cypress').and('contain', 'Cypress Author')
    })

    it.only('A blog can be liked', () => {
      cy.contains('Create New Blog').click()
      cy.get('#title-input').type('A blog created by cypress')
      cy.get('input[placeholder="Enter author name"]').type('Cypress Author')
      cy.get('input[placeholder="https://example.com"]').type('https://cypress.io')
      cy.get('form').contains('Create').click()

      // Maneira mais confiável - procura elementos que contenham as duas partes
      cy.get('.blog')
        .should('contain', 'A blog created by cypress')
        .and('contain', 'Cypress Author')

      // Abre os detalhes
      cy.contains('.blog', 'A blog created by cypress')
        .find('#view-button')
        .click()

      // Dá like
      cy.contains('.blog', 'A blog created by cypress')
        .find('#like-button')
        .click()

      // Verifica o like
      cy.contains('.blog', 'A blog created by cypress')
        .should('contain', 'likes 1')
  })

    it('A blog can be deleted by the user who created it', () => {
      cy.contains('Create New Blog').click()
      cy.get('#title-input').type('A blog created by cypress')
      cy.get('input[placeholder="Enter author name"]').type('Cypress Author')
      cy.get('input[placeholder="https://example.com"]').type('https://cypress.io')
      cy.get('form').contains('Create').click()
      cy.contains('A blog created by cypress — Cypress Author')
      .find('#view-button')
      .click()
      cy.contains('A blog created by cypress — Cypress Author')
      .parent()
      .find('#remove-button')
      .click()
      cy.get('html').should('not.contain', 'A blog created by cypress — Cypress Author')
    })
    
    it('Remove button is not shown for other users', () => {
      cy.contains('Create New Blog').click()
      cy.get('#title-input').type('A blog created by cypress')
      cy.get('input[placeholder="Enter author name"]').type('Cypress Author')
      cy.get('input[placeholder="https://example.com"]').type('https://cypress.io')
      cy.get('form').contains('Create').click()
      cy.contains('Logout').click()
      const anotherUser = {
        name: 'Another User',
        username: 'another',
        password: 'anotherpassword'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)
      cy.get('#username').type('another')
      cy.get('#password').type('anotherpassword')
      cy.get('#login-button').click()
      cy.contains('Another User logged in')
      cy.contains('A blog created by cypress — Cypress Author')
        .find('#view-button')
        .click()
      cy.contains('A blog created by cypress — Cypress Author')
        .parent()
        .should('not.contain', 'Remove Blog')
    })
  })

  describe('Blogs are ordered by likes', () => {
    beforeEach(() => {
    cy.get('#username').type('root')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

  const blogs = [
    { title: 'First Blog', author: 'Author One', url: 'https://firstblog.com', likes: 2 },
    { title: 'Second Blog', author: 'Author Two', url: 'https://secondblog.com', likes: 5 },
    { title: 'Third Blog', author: 'Author Three', url: 'https://thirdblog.com', likes: 3 }
  ]

  blogs.forEach(blog => {
    cy.contains('Create New Blog').click()
    cy.get('#title-input').type(blog.title)
    cy.get('#author-input').type(blog.author)
    cy.get('#url-input').type(blog.url)
    cy.get('form').contains('Create').click()

    cy.contains('.blog', blog.title).should('contain', blog.author)

    cy.contains('.blog', blog.title).find('#view-button').click()

    for (let i = 0; i < blog.likes; i++) {
      cy.contains('.blog', blog.title).find('#like-button').click()
      cy.wait(300) 
    }

    cy.contains('.blog', blog.title).find('#view-button').click()
  })
})

    it('Blogs are displayed in descending order of likes', () => {
    cy.get('.blog').eq(0).should('contain', 'Second Blog')   // 5 likes
    cy.get('.blog').eq(1).should('contain', 'Third Blog')    // 3 likes
    cy.get('.blog').eq(2).should('contain', 'First Blog')    // 2 likes
    })
  })
})